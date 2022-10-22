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
 |-- _index.html         # the source of entry HTML file
 |-- index.html          # the compiled entry HTML file
 |-- package.json        # the NPM configure file
```
## Compile
```
cd ./your-project-name
vior compile
```
Then Vior will compile the source code from `./src` into `./dist` folder.

Compiled files will be `.js` files, as custom components in Vior. You can import each other of them among themselves, or in the entry HTML file `_index.html`.
## SFC Format
```html
<template>
    <!-- Vior custom component's HTML part -->
    <custom-component></custom-component>
</template>

<script>
    // Vior will prepare import-map for you, so that you can import like this:
    import Vior from 'vior'
    import YourComponent from 'yourComponent'
    /* be like:
       import Vior from './node_modules/vior/src/index.js'
       import YourComponent from './dist/yourComponent.js'
     */
    
    export default {
        /* component's options */
        comps: {
            'custom-component': YourComponent
        }
    }
</script>
```
## Hot Updating
```
vior hotupdate
```
Then Vior will watch your project files, and do compiling when the files change.
## Examples
See [vior-sfc-template](https://github.com/jwhgzs/vior-sfc-template), or initialize a new SFC project (which has a demo in it by defaultly) by Vior-CLI.