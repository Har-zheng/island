const Router = require('koa-router')
const {
  TokenValidator,
  NotEmptyValidator
} = require('@validator')
const {
  LoginType
} = require('@lib/enum')
const {
  User
} = require('@model/user')
const {
  ParameterException
} = require('@core/http-exception')
const {
  generateToken
} = require('@core/util')
const {
  Auth
} = require('@middlewares/auth')
const {
  WXManger
} = require('@services/wx')
const router = new Router({
  prefix: '/v1/token'
})
router.post('/', async ctx => {
  const v = await new TokenValidator().validate(ctx)
  // type
  // USER_MINI_PROGRAM:
  // USER_EMAIL:
  // USER_MOBILE:
  // ADMIN_EMAL:
  let token;
  switch (v.get('body.type')) {
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManger.codeToToken(v.get('body.account'))
      break;
    case LoginType.USER_EMAIL:
      // secret
      token = await emaiLogin(v.get('body.account'), v.get('body.secret'), Auth.USER)
      break;
      // case LoginType.USER_MOBILE:
      //   break;
    case LoginType.ADMIN_EMAIL:
      break;
    default:
      throw new ParameterException('没有找到执行的函数')
      break;
  }
  ctx.body = {
    token
  }
})
router.post('/verify', async ctx => {
  const v = await new NotEmptyValidator().validate(ctx)
  const result = await Auth.verifyToken(v.get('body.token'))
  ctx.body = {
    is_valid: result
  }
})

const emaiLogin = async (account, secret, role) => {
  const user = await User.verifyEmailPassword(account, secret)
  return generateToken(user.id, role)
}
module.exports = router