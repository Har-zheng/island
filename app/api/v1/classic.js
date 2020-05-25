const Router = require('koa-router')
const router = Router()
const {
  HttpException,
  ParameterException
} = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../lib/validators/validators')
router.post('/v1/:id/classic/latest', async (ctx, next) => {
  const {
    header,
    body,
    query
  } = ctx.request
  // const path = ctx.params
  const {
    method,
    path
  } = ctx

  const v = new PositiveIntegerValidator()
  v.validate(ctx)
  
  if (true) {
    const error = new ParameterException()
    // error.requestUrl = `${method} ${path}`
    throw error
  }
  ctx.body = {
    key: 'classic'
  }
})
module.exports = router