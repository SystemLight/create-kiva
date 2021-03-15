# electron-kiva

electron桌面应用程序模板

# 注意事项

- 国内请使用淘宝源加快下载速度

```
npm config set ELECTRON_MIRROR https://npm.taobao.org/mirrors/electron/
npm config set registry https://registry.npm.taobao.org
```

- linux下防止权限问题无法安装模块

```
npm config set user 0
npm config set unsafe-perm true
```

- 如果遇到模块NODE_MODULE_VERSION不匹配，请使用下列命令

```
npm i electron-rebuild -D
electron-rebuild
```

# 更新日志

### V1.2.10

- 更新eslint配置，去除google配置插件
