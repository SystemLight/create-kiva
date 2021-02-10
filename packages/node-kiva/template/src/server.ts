import {IncomingMessage, ServerResponse} from "http";

import {bar} from "./foo";

const http = require("http");

const server = http.createServer(function(request: IncomingMessage, response: ServerResponse) {
    console.log("create a server");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("hello " + bar);
    response.end();
});

server.listen(3000, function() {
    console.log("server listen, http://127.0.0.1:3000");
});
