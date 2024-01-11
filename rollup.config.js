import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import del from "rollup-plugin-delete";
import copy from "rollup-plugin-copy";

export default {
    input: "src/server.ts",
    output: {
        dir: "dist",
        format: "es",
    },
    plugins: [
        del({ targets: "dist/" }),
        typescript(),
        nodeResolve(),
        commonjs(),
        json(),
        terser(),
        copy({
            verbose: true,
            copySync: true,
            targets: [{ src: [".env", "package.json"], dest: "dist/"}],
        })
    ],
};