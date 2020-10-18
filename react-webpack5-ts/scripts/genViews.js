const ph = require("path");
const fs = require("fs");

const treePath = ph.join(process.cwd(), "views.tree");

let token = [];
const tokens = [];
const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]-";

class EOF {
}

function emmitToken(_type) {
    tokens.push({"type": _type, "value": token.join("")});
    token = [];
}

function start(char) {
    if (chars.includes(char)) {
        token.push(char);
        return isChar;
    }

    if ("\r\n".includes(char)) {
        token.push(char);
        return isWrapLine;
    }

    if (char === " ") {
        token.push(char);
        return isWhiteSpace;
    }

    throw new SyntaxError("无效字符");
}

function isChar(char) {
    if (char instanceof EOF) {
        emmitToken("Name");
        return start;
    }

    if (chars.includes(char)) {
        token.push(char);
        return isChar;
    }

    if ("\r\n".includes(char)) {
        emmitToken("Name");
        token.push(char);
        return isWrapLine;
    }

    if (char === " ") {
        emmitToken("Name");
        token.push(char);
        return isWhiteSpace;
    }

    throw new SyntaxError("无效字符");
}

function isWrapLine(char) {
    if (char instanceof EOF) {
        emmitToken("WrapLine");
        return start;
    }

    if (chars.includes(char)) {
        emmitToken("WrapLine");
        token.push(char);
        return isChar;
    }

    if ("\r\n".includes(char)) {
        token.push(char);
        return isWrapLine;
    }

    if (char === " ") {
        emmitToken("WrapLine");
        token.push(char);
        return isWhiteSpace;
    }

    throw new SyntaxError("无效字符");
}

function isWhiteSpace(char) {
    if (char instanceof EOF) {
        emmitToken("WhiteSpace");
        return start;
    }

    if (chars.includes(char)) {
        emmitToken("WhiteSpace");
        token.push(char);
        return isChar;
    }

    if ("\r\n".includes(char)) {
        emmitToken("WhiteSpace");
        token.push(char);
        return isWrapLine;
    }

    if (char === " ") {
        token.push(char);
        return isWhiteSpace;
    }

    throw new SyntaxError("无效字符");
}

const content = fs.readFileSync(treePath).toString();
let state = start;
for (const c of content) {
    state = state(c);
}
state(new EOF());

function expression() {
    let current = 0;
    const size = tokens.length;
    let distance = 0;

    function walk(parentDistance = -1) {
        const nodeList = [];
        while (true) {
            if (current >= size) {
                return nodeList;
            }

            const _token = tokens[current];

            if (_token.type === "WrapLine") {
                distance = 0;
            }

            if (_token.type === "WhiteSpace") {
                distance = _token["value"].length;
                if (distance <= parentDistance) {
                    return nodeList;
                }
            }

            if (_token.type === "Name") {
                if (distance === 0 && parentDistance !== -1) {
                    current -= 1;
                    return nodeList;
                }

                const node = {
                    "type": "ItemLiteral",
                    "name": _token["value"],
                    "item": []
                };

                current += 1;
                node["item"] = walk(distance);
                nodeList.push(node);

                if (distance <= parentDistance) {
                    return nodeList;
                }
            }

            current += 1;
        }
    }

    return walk();
}

const astTree = expression();
const rootPath = "src/views";

function doSomething(path) {
    const dirPath = ph.join(rootPath, path);
    if (fs.existsSync(dirPath)) {
        return;
    }
    fs.mkdirSync(dirPath);

    const filePath = ph.join(dirPath, "index.tsx");
    if (fs.existsSync(filePath)) {
        return;
    }
    fs.writeFileSync(filePath, `import React from "react";

import {RouteView} from "@core/routeView";
import {R404Page} from "@core/errorBoundary/404";
import {qr} from "@/config";

export default function() {
    return (
        <div>
            <RouteView routes={qr.getRoute("$${path.replace(/[\/\\]/g, ".")}")}>{
                () => <h1 style={{textAlign: "center"}}>访问组件：${filePath}</h1>
            }</RouteView>
        </div>
    );
}
`);
}

function parser(tree, root = "") {
    for (const node of tree) {
        doSomething(root + "/" + node["name"]);
        parser(node["item"], root + "/" + node["name"]);
    }
}

parser(astTree);
