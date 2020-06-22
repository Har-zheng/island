const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})
const {
  Auth
} = require('@middlewares/auth')
const {
  Flow
} = require('@model/flow')
const {
  roles
} = require('@lib/enum')
const {
  Art
} = require('@model/art')
const {
  PositiveIntegerValidator
} = require('@validator')
const {
  Favor
} = require('../../models/favor')
const {
  NotFound
} = require('@core/http-exception.js')
// 获取当前期刊的最新
router.get('/latest', new Auth(roles.USER).m, async (ctx, next) => {
  console.log(roles)
  const flow = await Flow.findOne({
    order: [
      ['index', 'DESC']
    ]
  })
  const {
    art_id,
    type,
    index
  } = flow
  const art = await Art.getData(art_id, type)
  const likeLatest = await Favor.userLikeIt(art_id, type, ctx.auth.uid)
  art.setDataValue('index', index)
  art.setDataValue('likeStatus', likeLatest)
  ctx.body = art
})
// 获取上一期
router.get('/:index/previous', new Auth(roles.USER).m, async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index'
  })
  const index = v.get('path.index')
  const flow = await Flow.findOne({
    where: {
      index: index - 1
    }
  })
  if (!flow) {
    throw new NotFound()
  }
  const { art_id, type  } = flow
  const art = await Art.getData(art_id, type)
  const likeLatest = await Favor.userLikeIt(art_id, type, ctx.auth.uid)
  art.setDataValue('index', index - 1)
  art.setDataValue('likeStatus', likeLatest)
  ctx.body = art
})
// 获取下一期
router.get('/:index/next', new Auth(roles.USER).m, async (ctx,next) => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'index'
  })
  const  index  = v.get('path.index')
  const flow = await Flow.findOne({
    where: {
      index: index  + 1
    }
  })
  if(!flow){
    throw new NotFound()
  }
  const { art_id, type,index } = flow
  const  art = await Art.getData(art_id, type)
  const likeLatest = await Favor.userLikeIt(art_id, type, ctx.auth.uid)
  art.setDataValue('index', index)
  art.setDataValue('likeStatus', likeLatest)
  ctx.body = art

})

module.exports = router