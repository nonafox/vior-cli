#!/usr/bin/env node
import path from 'path'
import download from 'download-git-repo'
import program from 'commander'
import chalk from 'chalk'
import fs from 'fs'
import ora from 'ora'
import { execSync } from 'child_process'

import Util from './util.js'

program
    .usage(`<project-name>`)
    .parse(process.argv)

let projectName = program.args[0]
if (! projectName) {
    console.log(chalk.red(`missing parameter 'projectName'!`))
    process.exit(1)
}
let rpath = path.resolve(projectName)

let spinner = ora('downloading template').start()
console.log()
if (fs.existsSync(rpath))
    Util.delDir(rpath)

download('jwhgzs/vior-sfc-template', rpath, {clone: false}, function (err) {
    spinner.stop()
    if (err) {
        console.log(chalk.red('download error!'))
        process.exit(1)
    }
    console.log(chalk.green('download success!'))
    
    spinner = ora('installing dependencies').start()
    console.log()
    execSync(`cd ${rpath} && npm install`)
    console.log(chalk.green('install success!'))
    spinner.stop()
})