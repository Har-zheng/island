const Router = require('koa-router')
const router = Router()
router.get('/classic/book', async (ctx,next) => {
  ctx.body = {
    key: '书'
  }
})
module.exports =  router