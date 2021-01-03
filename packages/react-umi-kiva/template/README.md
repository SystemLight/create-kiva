# react-chobits

基于umiJS进行定制的模板

## 目录说明

同umiJS

#### 开发依赖

- [x] less
- [x] typescript
- [x] eslint
- [x] mockjs
- [ ] jest

#### 生产依赖

- [x] react
    - [ ] prop-types
    - [ ] styled-components
- [x] umi
- [x] umi-request
- [x] dva
    - [x] react-saga
- [x] antd
    - [x] @ant-design/icons
    - [x] @ant-design/pro-form
    - [x] @ant-design/pro-layout
    - [x] @ant-design/pro-table
- [x] classnames
- [x] qs
- [x] lodash

## 项目约定

#### 1. 目录结构

- 符合umiJS约定式路由
- 页面目录或文件统一小写并使用" - "分割单词
- 组件目录或文件统一首单词首字母大写驼峰命名

#### 2. CSS命名

- 单词分割符号 "-"
- 命名空间和应用名称分割符号 "__"
- 命名空间可嵌套迭代

举例说明：

```
cho-table 为命名空间
even-row  标识当前class作用

cho-table__even-row
```
