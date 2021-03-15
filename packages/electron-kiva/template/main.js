const {app, BrowserWindow} = require("electron");

const {createWindow, staticPath} = require("./src/utils");

app.allowRendererProcessReuse = false;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow(staticPath("index.html"), true, {frame: true});

    app.on("activate", function() {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow(staticPath("index.html"), true, {frame: true});
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
