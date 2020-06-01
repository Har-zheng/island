const Koa = require('koa')

const app = new Koa()
const Router = require('koa-router')
const Parser = require('koa-bodyparser')
const parser = new Parser()
app.use(parser)

const InitManager = require('./core/init')
const catchError = require('./middlewares/exception')
require('./app/models/user')
app.use(catchError)
InitManager.initCore(app)

// 获取当前文件 绝对路径
// process.cwd()
// console.log(process.cwd())
app.listen(3000)