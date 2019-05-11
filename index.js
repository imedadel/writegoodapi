const Koa = require("koa");
const koaBody = require("koa-body");
const _ = require("koa-route");
const writeGood = require("write-good");

const app = (module.exports = new Koa());

app.use(
  koaBody({
    jsonLimit: "1kb"
  })
);

// co-body accepts application/json
// and application/x-www-form-urlencoded

// app.use(async function(ctx) {
//   const body = ctx.request.body;
//   if (!body.text) ctx.throw(400, '.text required');
//   if(!body.options) ctx.body = writeGood(body.text);
//   else {
//     if(typeof(body.options) !== "object") ctx.throw(400, '.options should be an object');
//     ctx.body = writeGood(body.text,body.options);
//   }
// });

app.use(
  _.get("/", async ctx => {
    ctx.body =
      "Send a POST request to /api containing `text` (string) and, optionally, `options` (object).";
  })
);

app.use(
  _.get("/api", async ctx => {
    const body = ctx.request.body;
    if (!body.text) ctx.throw(400, ".text required");
    if (!body.options) ctx.body = writeGood(body.text);
    else {
      if (typeof body.options !== "object")
        ctx.throw(400, ".options should be an object");
      ctx.body = writeGood(body.text, body.options);
    }
  })
);

if (!module.parent) app.listen(3000);
