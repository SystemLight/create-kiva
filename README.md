# create-kiva

kiva系列模板快速搭建工具

## 获取方法

```
npm install create-kiva -g
create-kiva install react-kiva
```

## kiva系列模板开发

1. 发布模块包中必须包含template文件夹
2. template文件夹中可以包含gitignore文件，注意不要加 `.` 符号，发布时会被文件系统忽略，模板安装时自动添加
3. 命名规则 `<自定义名称>-kiva`
4. 切记发布之前务必删除所有不需要上传文件，如node_modules文件夹以及IDE创建的临时文件夹

## 模板列表

- 下列模板并非所有都发行到npm上，有些模板由于暂不稳定所以未及时更新

| 名称  |  介绍   |
| --- | --- |
|  basic-kiva   |  基础规范集成模板   |
|  electron-kiva   |  桌面应用开发基础模板   |
|  node-kiva   |  nodeJS开发模板   |
|  react-huge-kiva   |  react演示专用，重量级集成模板 |
|  react-kiva   |  react前端浏览器项目基础模板   |
|  react-mobile-kiva   | react移动端项目模板    |
|  react-ssr-kiva   |  react服务端渲染（SSR）基础模板   |
|  react-umi-kiva   |  基于umiJS的react前端模板   |
|  vue-kiva   |  Vue前端浏览器项目基础模板   |
