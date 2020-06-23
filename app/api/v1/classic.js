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
  PositiveIntegerValidator,
  ClassicValidator
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
  const { art_id, type } = flow
  const  art = await Art.getData(art_id, type)
  const likeLatest = await Favor.userLikeIt(art_id, type, ctx.auth.uid)
  art.setDataValue('index', index  + 1)
  art.setDataValue('likeStatus', likeLatest)
  ctx.body = art
})
// 获取点赞信息
router.get('/:id/:type/favor', new Auth().m, async ctx => {
  const v = await new ClassicValidator().validate(ctx)
  const id = parseInt(v.get('path.id'))
  const type =  parseInt(v.get('path.type')) 
  const art = await Art.getData(id,type )
  if(!art){
    throw new NotFound()
  }
  const like = await Favor.userLikeIt(id, type, ctx.auth.uid)
  ctx.body = {
    favNums: art.fav_nums,
    likeStatus: like
  }
})
// 查询点赞过的期刊
router.get('/favor', new Auth().m, async ctx => {
  ctx.body = await Favor.getMyClassicFavors(ctx.auth.uid )
})

module.exports = router