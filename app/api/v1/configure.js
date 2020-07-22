const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/config'
})

// 音乐通过配置先隐藏
router.get('/music', async ctx => {
  ctx.body = {
    isShow : true
  }
})
module.exports = router