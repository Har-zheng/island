const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})
const {
  HttpException,
  ParameterException
} = require('../../../core/http-exception')

const {
  PositiveIntegerValidator
} = require('../../validators/validators')
const {
  Auth
} = require('../../../middlewares/auth')
const { roles } = require('../../lib/enum')
router.get('/latest', new Auth(roles.USER).m, async (ctx, next) => {
  console.log(roles)
  ctx.body = ctx.auth.uid
  
  // 限制 token 角色
  // 普通权限 管理员

  // const {
  //   header,
  //   body,
  //   query
  // } = ctx.request
  // const path = ctx.params
  // const v = await new PositiveIntegerValidator().validate(ctx)
  // if (true) {
  //   // const error = new ParameterException()
  //   // error.requestUrl = `${method} ${path}`
  //   throw error
  // }

})
module.exports = router