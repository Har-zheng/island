const Router = require('koa-router')
const { Auth } = require('../../../middlewares/auth')
const { LikeValidator } = require('../../../core/http-exception')
const { Favor } = require('../../models/favor')
const router = new Router({
  prefix: "/v1/like"
})
router.post('/', new Auth(), async ctx => {
  const v = await new LikeValidator().validate(ctx)
  Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
})