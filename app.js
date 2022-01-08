const Koa = require('koa')
const path = require('path')
const app = new Koa()

const koaBody = require('koa-body');
// const Parser = require('koa-bodyparser')

const static = require('koa-static')
var cors = require('koa2-cors');

app.use(cors());

require('module-alias/register')
app.use(koaBody())
app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type');
  ctx.set('Access-Control-Allow-Methods', 'POST');
  await next();
});
const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
require('./app/models/user')
app.use(catchError)
app.use(static(path.join(__dirname, './static')))
InitManager.initCore(app)

// 获取当前文件 绝对路径
// process.cwd()
// console.log(process.cwd())
app.listen(3000)