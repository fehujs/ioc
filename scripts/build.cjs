const esbuild = require("esbuild")
const { existsSync, rmSync } = require("node:fs")
const pkgjson = require("../package.json")

if (existsSync('build'))
    rmSync('build', { recursive: true })

esbuild.build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outfile: './build/index.js',
    platform: 'node',
    target: 'esnext',
    format: 'esm',
    sourcemap: true,
    tsconfig: './tsconfig.json',
    external: pkgjson.dependencies ? Object.keys(pkgjson.dependencies) : [],
}).catch(() => process.exit(1))
