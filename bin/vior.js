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
    .command('compile', 'compile a Vior SFC project.')
    .parse(process.argv)