import React from "react";
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router";
import {renderRoutes} from "react-router-config";

import * as http from "http";
import * as fs from "fs";

import {routes} from "config";

const clientScript = fs.readFileSync("../wwwroot/client.js").toString("utf-8");

console.log("Listen: http://127.0.0.1:3000");
http.createServer((req, res) => {
    const html = ReactDOMServer.renderToString(
        <StaticRouter location={req.url}>
            {renderRoutes(routes)}
        </StaticRouter>
    );

    res.write(`
            <html>
                <head>
                <title>React SSR</title>
                <style></style>
                <script></script>
                </head>
                <body>
                <div id="root">${html}</div>
                <script>
                  ${clientScript}
                </script>
                </body>
            </html>
    `);

    res.end();
}).listen(3000);
