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
        console.log(chalk.red('error when paring file: src/' + v))
        process.exit(1)
    }
    
    let name_js = v.replace(/\.vior\.html$/, '.js'),
        name = v.replace(/\.vior\.html$/, ''),
        name_ori = v
    
    let read = { html: null, js: null }
    for (let k2 in tree) {
        let v2 = tree[k2]
        if (v2.tag == 'template') {
            read.html = tdom.patch(v2).replace(/\\/g, '\\\\').replace(/`/g, '\\\`')
        }
        if (v2.tag == 'script') {
            read.js = v2.children[0].text
        }
    }
    let res = read.js
    let _res = `
        import origin from './_${name_js}'
        origin.html = \`${read.html}\`
        export default origin
    `
    
    fs.writeFileSync(rpath + '/dist/_' + name_js, res)
    fs.writeFileSync(rpath + '/dist/' + name_js, _res)
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
}, importmap = JSON.stringify(importMap)
let vnode = tdom.read(content), rtree
try {
    for (let k in vnode.children) {
        let v = vnode.children[k]
        if (v.tag == 'html')
            rtree = v.children
    }
    let ok = false
    for (let k in rtree) {
        let v = rtree[k]
        if (v.tag == 'head') {
            ok = true
            v.children.splice(0, 0, tdom.read(`<script type="importmap">${importmap}</script>`).children[0])
        }
    }
    if (! ok)
        throw new Error()
} catch (ex) {
    console.log(chalk.red('error when paring file: _index.html'))
    process.exit(1)
}
content = tdom.patch(vnode)
fs.writeFileSync(rpath + '/index.html', content)

spinner.stop()
console.log(chalk.green('* compile complete!'))
console.timeEnd('* time')