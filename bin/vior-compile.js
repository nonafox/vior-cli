#!/usr/bin/env node
import path from 'path'
import download from 'download-git-repo'
import program from 'commander'
import chalk from 'chalk'
import fs from 'fs'
import ora from 'ora'

import Util from './util.js'
import TDom from 'vior/src/tdom.js'
let tdom = new TDom()

program.parse(process.argv)
let rpath = path.resolve('.')

console.time('* time')
let spinner = ora('compiling project').start()
console.log()

if (! fs.existsSync(rpath + '/dist'))
    fs.mkdirSync(rpath + '/dist')
let arr = fs.readdirSync(rpath + '/src'), imports = {}
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
    res = Util.scriptReplace(res, /export\s*default\s*{\s*/, `export default { html: '${read.html}', `)
    let name_js = v.replace(/\.vior\.html$/, '.js'),
        name = v.replace(/\.vior\.html$/, ''),
        name_ori = v
    fs.writeFileSync(rpath + '/dist/' + name_js, res)
    
    imports[name] = './dist/' + name_js
}
arr = fs.readdirSync(rpath + '/node_modules')
for (let k in arr) {
    let v = arr[k]
    if (fs.statSync(rpath + '/node_modules/' + v).isDirectory()) {
        let fpath = rpath + '/node_modules/' + v
        let config = JSON.parse(fs.readFileSync(fpath + '/package.json'))
        imports[v + '/'] = './node_modules/' + v + '/'
        imports[v] = './node_modules/' + v + '/' + (config.main || '')
    }
}

let content = fs.readFileSync(rpath + '/_index.html', 'utf-8')
let importMap = {
    imports: imports
}
let repHtml = `<script type="importmap">${JSON.stringify(importMap)}</script>\n</head>`
content = Util.scriptReplace(content, `</head>`, repHtml)
fs.writeFileSync(rpath + '/index.html', content)

spinner.stop()
console.log(chalk.green('* compile complete!'))
console.timeEnd('* time')