const fs = require("fs");
const ph = require("path");

/*
    webpack约定式路由插件
 */
module.exports = class AgreedRoutingPlugin {
    constructor(options = {}) {
        this.__proto__ = Object.assign(this.__proto__, {

            // 是否启用约定式路由
            enable: false,

            // 项目需要部署到CDN或者非根目录时，指定该项，使路由匹配增加前缀
            base: "",

            // 入口文件路径
            filePath: "src/config.tsx",

            // 约定式路由结构文件夹路径
            viewsPath: "src/views",

            // 忽略的文件夹名称，不进行约定式路由计算
            ignore: []

        }, options);
    }

    /*
        获取给定文件夹路径下子文件夹数量
     */
    getDirLength(path) {
        let count = 0;
        for (const p of fs.readdirSync(path)) {
            const stat = fs.statSync(ph.join(path, p));
            if (stat.isDirectory() === true) {
                count++;
            }
        }
        return count;
    }

    /*
        转换可选目录为可选路由，如[users]目录转换为:users
     */
    convertOption(dirNames) {
        const newDirNames = [];
        for (const name of dirNames) {
            if (name.startsWith("[") && name.endsWith("]")) {
                newDirNames.push(":" + name.slice(1, name.length - 1));
            } else {
                newDirNames.push(name);
            }
        }
        return newDirNames;
    }

    /*
        生成约定式路由配置字符串
     */
    generateRoute(viewsPath, depth = [], cutComma = false) {
        if (!viewsPath) {
            viewsPath = this.viewsPath;
        }

        let result = "";
        for (const p of fs.readdirSync(viewsPath)) {
            if (this.ignore.includes(p)) {
                continue;
            }

            const fPath = ph.join(viewsPath, p);
            const stat = fs.statSync(fPath);
            if (stat.isDirectory() === true) {
                const absPath = [...depth, p];
                const routePath = this.convertOption(absPath);

                result += `{key: "${p}",path: "${this.base}/${routePath.join("/")}"`;
                result += `,component: dynamic(() => import(/* webpackChunkName: "${absPath.join("-")}" */"@v/${absPath.join("/")}"))`;

                if (this.getDirLength(fPath) !== 0) {
                    result += `,subRoute: [${this.generateRoute(fPath, absPath, true)}]`;
                    result += ",exact: false";
                } else {
                    result += ",exact: true";
                }

                result += "},";
            }
        }
        return cutComma ? result.slice(0, result.length - 1) : result;
    }

    /*
        替换文件中标识符位置的约定式路由配置内容
     */
    replaceRouteFile(data = "") {
        const {filePath} = this;
        const content = fs.readFileSync(filePath).toString();
        const result = content.replace(
            /\/\* <AgreedRouting> \*\/(.*?)\/\* <\/AgreedRouting> \*\//s,
            `/* <AgreedRouting> */\n            ${data}\n            /* </AgreedRouting> */`
        );
        fs.writeFileSync(filePath, result);
    }

    apply(compiler) {
        if (!this.enable) {
            return;
        }

        compiler.hooks.entryOption.tap("AgreedRoutingPlugin", () => {
            this.replaceRouteFile(this.generateRoute());
        });
    }
};
