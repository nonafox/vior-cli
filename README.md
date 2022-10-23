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
 |-- /src                # your souce codes (SFC files with '.html' suffixes, or common '.js' files) be in
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

Compiled files will be all `.js` files, you can import them in any files you need.
## SFC Format
```html
<template>
    <!-- Vior custom component's HTML part to be here, instead of using `html` option in JS part in common -->
    <custom-component></custom-component>
</template>

<script>
    // Vior will prepare import-map for you, so that you can import like this:
    import Vior from 'vior'
    import YourComponent from 'yourComponent'
    import yourPlugin from 'yourPlugin'
    /* be like:
       import Vior from './node_modules/vior/src/index.js'
       import YourComponent from './dist/yourComponent.js'
       import yourPlugin from './dist/yourPlugin.js' */
    
    export default {
        /* component's options */
        comps: {
            'custom-component': YourComponent
        },
        plugins: [
            { plugin: YourPlugin }
        ]
    }
</script>
```
## Hot Updating
```
vior auto
```
Then Vior will watch your project files, and do compiling when the files change.
## Examples
See [vior-sfc-fun](https://github.com/jwhgzs/vior-sfc-fun).