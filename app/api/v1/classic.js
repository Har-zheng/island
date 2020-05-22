const Router = require('koa-router')
const router = Router()
router.post('/v1/:id/classic/latest', async (ctx,next) => {
  const { header, body, query } = ctx.request
  const path = ctx.params
  ctx.body = {
    key: 'classic'
  }
})
module.exports = router
