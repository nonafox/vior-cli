#!/usr/bin/env node
import path from 'path'
import download from 'download-git-repo'
import program from 'commander'
import chalk from 'chalk'
import fs from 'fs'
import ora from 'ora'

import TDom from 'vior/src/tdom.js'
let tdom = new TDom()

program.parse(process.argv)
let rpath = path.resolve('.')

let spinner = ora('compiling project').start()
console.log()

if (! fs.existsSync(rpath + '/dist'))
    fs.mkdirSync(rpath + '/dist')
let arr = fs.readdirSync(rpath + '/src')
for (let k in arr) {
    let v = arr[k]
    if (! /\.vior\.html$/.test(v))
        continue
    let content, tree
    try {
        content = fs.readFileSync(rpath + '/src/' + v, 'utf-8')
        tree = tdom.read(content).children
    } catch (ex) {
        console.log(chalk.red('error when paring file: ' + v))
        process.exit(1)
    }
    
    let read = { html: null, js: null }
    for (let k2 in tree) {
        let v2 = tree[k2]
        if (v2.tag == 'template') {
            read.html = tdom.patch(v2).replace(/\\/g, '\\\\').replace(/'/g, '\\\'')
        }
        if (v2.tag == 'script') {
            read.js = v2.children[0].text
        }
    }
    
    let res = read.js
    res = res.replace(/export\s*default\s*{\s*/, `export default { html: '${read.html}', `)
    fs.writeFileSync(rpath + '/dist/' + v.replace(/\.vior\.html$/, '.js'), res)
}

spinner.stop()
console.log(chalk.green('compile complete!'))