const fs = require("fs");
const ph = require("path");

/*
    webpack约定式状态模型插件
 */
module.exports = class AgreedModelPlugin {
    constructor(options = {}) {
        this.__proto__ = Object.assign(this.__proto__, {

            enable: true,

            filePath: "config/index.tsx",

            modelsPath: "src/models"

        }, options);
    }

    apply(compiler) {
        if (!this.enable) {
            return;
        }

        compiler.hooks.entryOption.tap("AgreedModelPlugin", () => {
            let importResult = "";
            let interfaceResult = "";
            let exportResult = "";

            let registerResult = "";
            for (const p of fs.readdirSync(this.modelsPath)) {
                const fPath = ph.join(this.modelsPath, p);
                const stat = fs.statSync(fPath);
                if (stat.isDirectory() === true) {
                    const titleP = p[0].toUpperCase() + p.slice(1, p.length);
                    importResult += `import {I${titleP}State} from "@/models/${p}";\n`;
                    interfaceResult += `${p}: I${titleP}State,\n`;
                    exportResult += `export * from "./${p}";\n`;
                    registerResult += `soul.register(require("@/models/${p}").default);\n`;
                }
            }
            const note = "// 注意当前文件启用约定模型，请不要在这里编码任何内容\n";
            fs.writeFileSync(
                this.modelsPath + "/index.ts",
                `${note}${importResult}\nexport interface IStates {\n${interfaceResult}\n}\n${exportResult}`
            );

            const content = fs.readFileSync(this.filePath).toString();
            const result = content.replace(
                /\/\* <AgreedModel> \*\/(.*?)\/\* <\/AgreedModel> \*\//s,
                `/* <AgreedModel> */\n${registerResult}/* </AgreedModel> */`
            );
            fs.writeFileSync(this.filePath, result);
        });
    }
};
