with (import <nixpkgs> {});
mkShell {
    buildInputs = [
        gdb
        strace
    ];
}
