const Router = require('koa-router')
const { Book } = require('@model/book.js')
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
router.get('/:id/book', async (ctx, next) => {
  const detail = await Book.detail()
  ctx.body = detail
})
module.exports = router