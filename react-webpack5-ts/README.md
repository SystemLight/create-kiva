# @kiva/react-webpack5-ts

相比@systemlight/react-webpack-ts删减了些许配置内容，秉承着
约定大于配置的思想，@kiva/react-webpack5-ts定位为不支持多页应用，
不支持JS统一采用TS，不支持CSS统一采用less，样式文件统一提取到单独文件夹中，
不支持IE11以下的浏览器

## 技术栈

#### 开发依赖

- [x] babel
- [x] webpack
- [x] eslint
- [x] typescript

#### 生产依赖

- [x] react
    - [x] react-router-dom
    - [x] styled-components
    - [x] react-redux
- [x] redux
    - [x] react-redux
    - [x] redux-thunk
    - [x] reselect
- [x] antd
    - [x] @ant-design/icons
- [x] less
- [x] axios
- [x] qs

## 配置项目

#### 1. views.tree

- 简述

`views.tree` 配置文件允许你一种树形语法书写配置，不同于yaml这种，这个配置项意在更加清晰合理配置目录结构，并生成该结构。

解决问题：

该模板项目基于约定路由可以通过views/src下目录生成路由配置，但是大多时候我们仍然要很枯燥的一个一个构建该目录文件，
这时候我们就可以通过views.tree配置文件，书写一段类似windows下tree输出的内容语法，看上去与即将生成的结构如此吻合。

- 举例：

这个语法看上去是这样的，通过缩进对其的方式来表示目录结构，因为目录结构就是看上去的这个样子，
之后通过npm run gen:views，项目自动读取该配置文件，并在src/views生成这个看上去的目录结构。

注意：
1. npm run gen:views 并不会覆盖或者写入已经存在的目录或者文件，会主动跳过
2. views.tree配置文件对缩进对齐并不是很敏感，只要是看上去那样就可以，所以注意缩进空格控制

```
example
    [users]
    edittable
    my
```

## 运行时

#### QueryRoute对象

- QueryRoute#routes : 注册的路由对象IRoutes
- QueryRoute#getRoute(key)
    - key : 查找路由匹配对象，key等同于目录结构用.分割，根目录符号为$，例如根目录下的example路由-->$.example

## 目录结构

|  文件名   | 作用  |
|  :----  | :----  |
| core  | 包含内置核心组件、工具函数等，导入路径为@c |
| draft  | 用于webpack的HTML模板存放位置 |
| public  | 静态文件 |
| script  | 项目脚本文件 |
| src  | 源码目录 |
| test  | 测试文件目录 |
| package.json  | 前端工程化依赖管理配置文件 |
| pages.config.js  | react多页面或者单页面核心配置文件 |
| views.tree  | 约定路由目录结构构建配置 |
| README.md  | 项目说明文件，markdown格式 |
| webpack.config.js  | 此文件并非webpack配置文件，实际是webpack.conf.js的简化版本，主要用来欺骗一些编译器使其可以识别webpack配置 |
