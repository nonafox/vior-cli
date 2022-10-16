# Vior-CLI
A simple CLI with SFC (i.e. Single-File Components) suppport for Vior.

# Languages
- English (current)
- [Chinese](https://github.com/jwhgzs/vior-cli/blob/main/README.chinese.md)

# Usage
## Install
```
npm install vior-cli -g
```
## Initialize
```
vior init your-project-name
```
Then Vior will create a SFC project template in the folder (`./your-project-name`) as well as install dependencies for you.
## Structure
```
/your-project-name
 |-- /src                # your souce codes (SFC files, with '.vior.html' suffixes) be in
 |-- /node_modules       # node.js' dependencies
 |-- /dist               # compiled codes be in
 |-- index.html          # the entry HTML file
 |-- package.json        # the NPM configure file
```
## SFC Format
```html
<template>
    <!-- your component's HTML contents -->
</template>

<script>
    export default {
        /* your component's options */
    }
</script>
```
## Compile
```
cd ./your-project-name
vior compile
```
Then Vior will compile the source code from `./src` into `./dist` folder.

Compiled files will be `.js` files, as custom components in Vior. You can import each other of them among themselves, or in the entry HTML file `index.html`.
## Examples
See [vior-sfc-template](https://github.com/jwhgzs/vior-sfc-template), or initialize a new SFC project (which has a demo in it by defaultly) by Vior-CLI.