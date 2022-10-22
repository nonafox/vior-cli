#!/usr/bin/env node
import program from 'commander'
import path from 'path'
import url from 'url'
import fs from 'fs'

globalThis.__dirname = path.dirname(url.fileURLToPath(import.meta.url))
let packageJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'))

program
    .version(packageJson.version)
    .command('init', 'initialize a Vior SFC project.')
    .command('compile', 'compile the current Vior SFC project.')
    .command('hotupdate', 'enable hot updating (automatically compiling) on current Vior SFC project.')
    .parse(process.argv)