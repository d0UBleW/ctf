#!/usr/bin/env python3

from pwn import remote

# [(0,), (98624380944537003185235736096046992680891830197061490109937833490419136188999442576576769103890995893380022607743740081787109376,), (1375619055462996814764263903953007319108169802938509890062166509580863811000557423423230896109004106619977392256259918212890625,), (1,)]

code = 98624380944537003185235736096046992680891830197061490109937833490419136188999442576576769103890995893380022607743740081787109376

io = remote("34.124.157.94", 10591)

io.sendlineafter(b"code: ", f"{code}".encode())
io.sendlineafter(b"code: ", f"{code}".encode())

io.interactive()
