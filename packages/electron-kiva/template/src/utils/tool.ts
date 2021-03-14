import {BrowserWindow, Menu, BrowserWindowConstructorOptions} from "electron";

/**
 * 工厂函数，构建一个electron窗口实例
 * @param {string} filePath -文件路径
 * @param {boolean} debug -是否开启debug模式窗口
 * @param {BrowserWindowConstructorOptions} options -窗口构造函数可选项
 * @return {BrowserWindow} browserWindow -窗口实例
 */
export function createWindow(filePath: string, debug: boolean = false, options: BrowserWindowConstructorOptions = {}) {
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
