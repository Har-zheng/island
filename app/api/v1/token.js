const Router = require('koa-router')
const {
  TokenValidator
} = require('../../validators/validators')
const {
  LoginType
} = require('../../lib/enum')
const {
  User
} = require('../../models/user')
const {
  ParameterException
} = require('../../../core/http-exception')
const { generateToken } = require('../../../core/util')
const router = new Router({
  prefix: '/v1/token'
})
router.post('/', async ctx => {
  const v = await new TokenValidator().validate(ctx)
  // type
  //   USER_MINI_PROGRAM:
  // USER_EMAIL:
  // USER_MOBILE:
  // ADMIN_EMAL:
  let token;
  switch (v.get('body.type')) {
    case LoginType.USER_MINI_PROGRAM:
      break;
    case LoginType.USER_EMAIL:
      // secret
      token =  await emaiLogin(v.get('body.account'), v.get('body.secret'))
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

const emaiLogin = async (account, secret) => {
  const user = await User.verifyEmailPassword(account, secret)
  return  generateToken(user.id, 2)
}
module.exports = router