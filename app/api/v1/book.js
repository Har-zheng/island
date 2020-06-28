const Router = require('koa-router')
const router = Router({
  prefix: '/v1'
})
router.get('/book/hot_list', async (ctx,next) => {
  ctx.body = {
    key: '书'
  }
})
module.exports =  router