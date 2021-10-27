const childProcess = require('child_process');
const packageJSON = require(`${process.cwd()}/package.json`);

const devPackage = packageJSON['devDependencies'];
const proPackage = packageJSON['dependencies'];

/*
    运行npm install命令安装给定名称依赖包
 */
async function install(name, extraArg) {
    return new Promise(function(resolve) {
        childProcess.exec(`npm install ${name}@latest ${extraArg}`, (error) => {
            if (error) {
                console.error(error);
            }
        }).stdout.on('data', (data) => {
            console.log(data);
        }).on('end', () => {
            resolve();
        });
    });
}

/*
    更新项目依赖包到最新版本
 */
async function updatePackage(pack, extraArg) {
    for (const k of Object.keys(pack)) {
        console.log(`start install ${k}`);
        await install(k, extraArg);
    }
}

/*
    版本更新器，自动更新所有包到最新版本
 */
updatePackage(devPackage, '--save-dev').then(() => {
    return updatePackage(proPackage, '--save');
});
