const Koa = require('koa')

const app = new Koa()
const Router = require('koa-router')
const Parser = require('koa-bodyparser')
const parser = new Parser()
app.use(parser)

const InitManager = require('./core/init')

InitManager.initCore(app)
process.cwd()
console.log(process.cwd())
app.listen(3000)