const Koa = require('koa')
const path = require('path')
const app = new Koa()
const Parser = require('koa-bodyparser')
const parser = new Parser()
const static = require('koa-static')

require('module-alias/register')

app.use(parser)


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