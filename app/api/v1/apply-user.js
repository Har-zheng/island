const Router = require('koa-router')

const { ApplyUser } = require('@model/apply-user')
const { User } = require('@model/user')
const { success } = require('@lib/helper')
const router = new Router({
  prefix: '/v1/applyUser'
})


// 设添加 user
router.post('/add', async (ctx, next) => {
  const { id } = ctx.request.body
  const user =  await User.getUser(id)
  await ApplyUser.addUser(user.dataValues)
  success()
});


//所有用户列表 
router.get('/getUser', async (ctx, next) => {
  const list = await ApplyUser.getApplyUser()
  ctx.body = {
    code: 20000,
    list
  }
});


module.exports = router