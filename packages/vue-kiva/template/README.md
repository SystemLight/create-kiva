# vue-kiva

vue-kiva是集成自动路由，状态管理，远程请求等功能的VUE开发模板

# 其它版本
- [create-kiva](https://github.com/SystemLight/create-kiva)
- [react-kiva](https://github.com/SystemLight/react-kiva)

## 获取方法

```
https://github.com/SystemLight/vue-kiva.git
npm install
npm run start
```

## 目录结构

|  文件名   | 作用  |
|  :----  | :----  |
| kiva  | 包含内置核心组件、工具函数等，导入路径为kiva |
| public  | 静态文件 |
| src  | 业务源码核心撰写目录 |
| package.json  | 前端工程化依赖管理配置文件 |
| pages.tree  | 约定路由目录结构构建配置 |
| webpack.config.js  | webpack核心配置文件 |

## 技术栈

#### 开发依赖

- [x] babel
- [x] typescript
- [x] webpack
- [x] eslint
- [ ] jest

#### 生产依赖

- [x] vue
    - [x] vue-router
    - [x] vuex
- [x] less
- [x] axios
- [x] qs
- [x] lodash

## 配置项目

#### 1. pages.tree-->快速生成页面骨架

- 简述

`pages.tree` 配置文件允许你一种树形语法书写配置，不同于yaml这种，这个配置项意在更加清晰合理配置目录结构，并生成该结构。

解决问题：

该模板项目基于约定路由可以通过pages/src下目录生成路由配置，但是大多时候我们仍然要很枯燥的一个一个构建该目录文件，
这时候我们就可以通过pages.tree配置文件，书写一段类似windows下tree输出的内容语法，看上去与即将生成的结构如此吻合。

- 举例：

这个语法看上去是这样的，通过缩进对其的方式来表示目录结构，因为目录结构就是看上去的这个样子，
之后通过npm run gen:pages，项目自动读取该配置文件，并在src/views生成这个看上去的目录结构。

注意：
1. npm run gen:views 并不会覆盖或者写入已经存在的目录或者文件，会主动跳过
2. pages.tree配置文件对缩进对齐并不是很敏感，只要是看上去那样就可以，所以注意缩进空格控制

```
example
    [users]
    edittable
    my
```

3. 优化路由生成，如果无需做路由嵌套时请尽量避免文件夹路径嵌套，对于上述路由页面生成优化写法应该是下列方式，
让他看起来更像JAVA的package，文件夹嵌套的写法更适合路由外包裹额外组件的场景。

```
example.[users]
example.edittable
example.my
```
