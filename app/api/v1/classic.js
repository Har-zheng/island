const Router = require('koa-router')
const router = new Router()
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

  const v = new PositiveIntegerValidator().validate(ctx)
  const id = v.get('path.id',parsed = false)

  ctx.body = 'success'
  
  // if (true) {
  //   // const error = new ParameterException()
  //   // error.requestUrl = `${method} ${path}`
  //   throw error
  // }

})
module.exports = router