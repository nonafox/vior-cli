#!/usr/bin/env node
import path from 'path'
import download from 'download-git-repo'
import program from 'commander'
import chalk from 'chalk'
import fs from 'fs'
import ora from 'ora'
import { execSync } from 'child_process'
import watch from 'node-watch'

program.parse(process.argv)
let rpath = path.resolve('.')

watch(rpath, { recursive: true }, (evt, fname) => {
    let spath = path.relative(rpath, fname)
    if (! (spath == '_index.html' || spath.indexOf('src/') === 0
           || spath.indexOf('node_modules/') === 0))
        return
    console.log(chalk.blue(`- File changed: ${spath}`))
    let spinner = ora('compiling').start()
    console.log()
    console.time('* time')
    try { execSync(`vior compile`) } catch (ex) {
        console.log(chalk.red('error when compiling! please simply run compile to display the errors.'))
        process.exit(1)
    }
    console.log(chalk.green(`* auto compiled!`))
    console.timeEnd('* time')
    spinner.stop()
})