const Router = require('koa-router')
const { RegisteerValidator } = require('../../lib/validators/validators')
const router =new Router({
  prefix: '/v1/user'
})
// 注册
router.post('/register', async (ctx) => {
  // 思维路径
  // 接收参数 LinValidator
  // email 
  const v = new RegisteerValidator().validate(ctx)
})
module.exports = router