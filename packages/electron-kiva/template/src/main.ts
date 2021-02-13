import {app} from "electron";

import {renderWindow} from "./utils/tool";

app.whenReady().then(function() {
    renderWindow("index.html", true, {frame: true});
});
