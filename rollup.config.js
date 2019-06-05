import builtins from "builtin-modules";
import cleanup from "rollup-plugin-cleanup";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import executable from "rollup-plugin-executable";
import json from "rollup-plugin-json";
import pkg from "./package.json";

// require('module').builtinModules
const external = [
  ...builtins
  "node-fetch",
  "ssh2"
];

export default {
  output: {
    file: pkg.bin["url-cmd"],
    format: "cjs",
    banner:
      '#!/bin/sh\n":" //# comment; exec /usr/bin/env node --experimental-modules "$0" "$@"',
    interop: false
  },
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    json({
      preferConst: true,
      compact: true
    }),
    cleanup({
      extensions: ["js", "mjs", "jsx", "tag"]
    }),
    executable()
  ],
  external,
  input: pkg.module
};
