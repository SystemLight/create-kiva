const Router = require("koa-router");

const router = new Router();

router.get("/", async (ctx, next) => {
  // ctx.body = "Hello World!";
  // await ctx.render("index");
  ctx.body = {foo: "bar"};
});

module.exports = router;
