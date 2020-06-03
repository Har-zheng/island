const Router = require('koa-router')
const { RegisteerValidator } = require('../../lib/validators/validators')
const { User } = require('../../models/user')
const router = new Router({
  prefix: '/v1/user'
})
// 注册
router.post('/register', async (ctx) => {
  // 思维路径
  // 接收参数 LinValidator
  // email 
  // 中间件
  const v = await new RegisteerValidator().validate(ctx)
  const user = {
    email: v.get('body.email'),
    password: v.get('body.password2'),
    nickname: v.get('body.nickname')
  }
  const r = await User.create(user)
  // 保存到数据库
  // sql model
})
module.exports = router