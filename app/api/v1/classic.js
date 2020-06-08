const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})
const {
  HttpException,
  ParameterException
} = require('../../../core/http-exception')
const { PositiveIntegerValidator } = require('../../validators/validators')
const { Auth } = require('../../../middlewares/auth')
router.get('/latest',  new Auth().m ,async (ctx, next) => {
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

  const v = await new PositiveIntegerValidator().validate(ctx)
  const id = v.get('path.id',parsed = false)

  ctx.body = 'success'
  
  // if (true) {
  //   // const error = new ParameterException()
  //   // error.requestUrl = `${method} ${path}`
  //   throw error
  // }

})
module.exports = router