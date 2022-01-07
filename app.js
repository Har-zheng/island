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