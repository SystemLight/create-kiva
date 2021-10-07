const Koa = require("koa");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const koaStatic = require("koa-static");
const logger = require("koa-logger");
const json = require("koa-json");
const views = require("koa-views");

// https://github.com/visionmedia/debug
// https://koa.bootcss.com/
// https://github.com/ZijianHe/koa-router
const app = new Koa();

// 全局中间件
onerror(app);

app.use(logger());
app.use(views(__dirname + "/views", {
    extension: "pug",
}));
app.use(bodyparser({
    enableTypes: ["json", "form", "text"]
}));
app.use(json());

// 路由注册
const indexRoute = require("./routes/index");
app.use(indexRoute.routes());
app.use(indexRoute.allowedMethods());

app.use(koaStatic(__dirname + "/public"));

module.exports = app;
