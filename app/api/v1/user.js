const Router = require('koa-router')
const { RegisteerValidator } = require('@validator')
const { User } = require('@model/user')
const { success } = require('@lib/helper')
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
  success()
  // 保存到数据库
  // sql model
})

// 设置vip user
router.post('/setVip', async (ctx, next) => {
  const { id } = ctx.request.body
  await User.setVip(id)
  success()
});

//查用户 
router.post('/getUser', async (ctx, next) => {
  const { id } = ctx.request.body
  const user = await User.getUser(id)
  ctx.body = {
    code: 20000,
    wxInfo: user
  }
});

router.post('/logout', async ctx => {
  ctx.body = {
    code: 20000,
    data: '登录成功!'
  }
})
module.exports = router