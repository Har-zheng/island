const Router = require('koa-router')
const router = Router({
  prefix: '/v1/book'
})
const {
  HotBook
} = require('@model/hot-book.js')
router.get('/hot_list', async (ctx, next) => {
  const favors = await HotBook.getAll()
  ctx.body = {
    key: favors
  }
})
module.exports = router