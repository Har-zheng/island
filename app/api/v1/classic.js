const Router = require('koa-router')
const router = Router()
router.post('/v1/:id/classic/latest', async (ctx,next) => {
  const { header, body, query } = ctx.request
  const path = ctx.params
  const {method, patch } = ctx

  if(true){
    const error = new Error('5000 错误!!')
    error.errorCode = 10001
    error.status = 400
    error.requestUrl = `${method} ${patch}`
    throw error
  }
  ctx.body = {
    key: 'classic'
  }
})
module.exports = router
