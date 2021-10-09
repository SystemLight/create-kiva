# create-kiva

kiva系列模板快速搭建工具

## 获取方法

```
npm install create-kiva -g
create-kiva i <模板名称>
```

## kiva系列模板开发

1. 发布模块包中必须包含template文件夹
2. template文件夹中可以包含gitignore文件，注意不要加 `.` 符号，发布时会被文件系统忽略，模板安装时自动添加
3. 命名规则 `<自定义名称>-kiva`
4. 切记发布之前务必删除所有不需要上传文件，如node_modules文件夹以及IDE创建的临时文件夹

## 模板列表

- 下列模板并非所有都发行到npm上，有些模板由于暂不稳定所以未及时更新

| 名称  |  介绍   | kiva构建 | 类似模板 |
| --- | --- | --- | --- |
|  basic-kiva   |  基础规范集成模板   | npx create-kiva i basic-kiva | npx create-html5-boilerplate ./app  |
|  electron-kiva   |  桌面应用开发基础模板   | npx create-kiva i basic-kiva  | [1] git clone https://github.com/electron/electron-quick-start <br/> [2] npx create-electron-app my-new-app    |
|  electron-reacte-kiva   |  electron集成React开发模板   | npx create-kiva i electron-react-kiva  | null  |
|  node-kiva   |  nodeJS应用程序开发模板   | npx create-kiva i node-kiva  | null |
|  express-kiva   |  express服务端开发模板   | npx create-kiva i express-kiva  | npx express-generator ./app  |
|  koa2-kiva   |  koa2服务端开发模板   | npx create-kiva i koa2-kiva  | npx koa-generator ./app  |
|  react-huge-kiva   |  react演示专用，重量级集成模板 | npx create-kiva i react-huge-kiva  | npx create-react-app ./app  |
|  react-kiva   |  react前端浏览器项目基础模板   | npx create-kiva i react-kiva  | npx create-react-app ./app  |
|  react-kiva2   |  注重轻量和编译速度的第二代react开发模板   | npx create-kiva i react-kiva2  | npx create-react-app ./app  |
|  react-mobile-kiva   | react移动端项目模板    | npx create-kiva i react-mobile-kiva  | npx create-react-app ./app  |
|  react-native-kiva   | react开发原生APP项目模板    | npx create-kiva i react-native-kiva  | npx react-native init ./app  |
|  react-ssr-kiva   |  react服务端渲染（SSR）基础模板   | npx create-kiva i react-ssr-kiva  | null  |
|  react-umi-kiva   |  基于umiJS的react前端模板   | npx create-kiva i react-umi-kiva  |  npx @umijs/create-umi-app |
|  vue-kiva   |  Vue前端浏览器项目基础模板   | npx create-kiva i vue-kiva  | npx @vue/cli create ./app  |
|  vue-mobile-kiva   |  Vue移动端浏览器项目基础模板   | npx create-kiva i vue-mobile-kiva  | npx @vue/cli create ./app  |
|  vue3-kiva   |  Vue3前端浏览器项目基础模板   | npx create-kiva i vue3-kiva  | npx @vue/cli@next create ./app  |
|  vue3-kiva2   |  基于vue-cli@next构建的vue3基础前端PC开发模板   | npx create-kiva i vue3-kiva2  | npx @vue/cli@next create ./app  |
|  vite-vue3-kiva   |  基于vite构建vue3前端开发模板  | npx create-kiva i vite-vue3-kiva  | npm init vite@latest  |
|  uniapp-kiva   |  uniapp跨移动端项目开发模板   | npx create-kiva i uniapp-kiva  | npx @vue/cli create -p dcloudio/uni-preset-vue ./app  |
