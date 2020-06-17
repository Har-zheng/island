const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})
const {
  Auth
} = require('../../../middlewares/auth')
const { Flow } = require('../../models/flow')
const { roles } = require('../../lib/enum')
const { Art } = require('../../models/art')
router.get('/latest', new Auth(roles.USER).m, async (ctx, next) => {
  console.log(roles)
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })
  const artFlow = await Art.getData(flow.art_id, flow.type)

  ctx.body = artFlow
})

module.exports = router