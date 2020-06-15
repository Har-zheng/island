const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})
const {
  Auth
} = require('../../../middlewares/auth')
const { Flow } = require('../../models/flow')
const { roles } = require('../../lib/enum')
router.get('/latest', new Auth(roles.USER).m, async (ctx, next) => {
  console.log(roles)
  const flow =await Flow.findOne({
    order:[
      ['index', 'DESC']
    ]
  })
   
  ctx.body = flow
})

module.exports = router