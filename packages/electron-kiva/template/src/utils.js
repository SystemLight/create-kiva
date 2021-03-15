const {BrowserWindow, Menu} = require("electron");

const publicPath = "./public/";

function staticPath(path) {
    return publicPath + path;
}

/**
 * 工厂函数，构建一个electron窗口实例
 * @param {string} filePath -文件路径
 * @param {boolean} debug -是否开启debug模式窗口
 * @param {BrowserWindowConstructorOptions} options -窗口构造函数可选项
 * @return {BrowserWindow} browserWindow -窗口实例
 */
function createWindow(filePath, debug = false, options = {}) {
    const browserWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        show: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            contextIsolation: false
        },
        ...options
    });
    browserWindow.loadFile(filePath).then();
    if (!debug) {
        Menu.setApplicationMenu(null);
    }
    browserWindow.once("ready-to-show", function() {
        browserWindow.show();
    });
    return browserWindow;
}

module.exports = {
    publicPath,
    staticPath,
    createWindow
};
