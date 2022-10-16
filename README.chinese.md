# Vior-CLI
一个为Vior而做的、带有单文件组件（SFC）支持的简单CLI。

# 多语言
- [English](https://github.com/jwhgzs/vior-cli/blob/main/README.md)
- 中文（当前）

# 使用指南
## 安装
```
npm install vior-cli -g
```
## 初始化
```
vior init 你的项目名称
```
这样，Vior会在指定目录`./你的项目名称`中，自动为你下载SFC项目模板，并使用NPM安装依赖项。
## 目录结构
```
/你的项目名称
 |-- /src                # 源代码（以'.vior.html'为后缀的SFC文件）放置目录
 |-- /node_modules       # node.js的依赖项目录
 |-- /dist               # 编译产物代码放置目录
 |-- _index.html         # 入口HTML文件（源码）
 |-- index.html          # 入口HTML文件（编译产物）
 |-- package.json        # NPM配置文件
```
## 编译
```
cd ./your-project-name
vior compile
```
然后，Vior会将`./src`目录的源代码编译并输出至`./dist`。输出产物均为`.js`文件，可作为普通的Vior自定义组件的options对象而被import、在其他组件或根组件中引入使用。
## SFC格式
```html
<template>
    <!-- 组件的HTML代码 -->
    <custom-component></custom-component>
</template>

<script>
    // Vior会自动生成importmap，你可以像这样简单地进行import
    import Vior from 'vior'
    import YourComponent from 'yourComponent'
    /* 效果：
       import Vior from './node_modules/vior/src/index.js'
       import YourComponent from './dist/yourComponent.js'
     */
    
    export default {
        /* 组件的options配置 */
        comps: {
            'custom-component': YourComponent
        }
    }
</script>
```
## 示例
参见[vior-sfc-template](https://github.com/jwhgzs/vior-sfc-template)。或可直接用本CLI初始化新项目，默认情况下默认模板中有示例文件。