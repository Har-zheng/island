const Router = require('koa-router')
const {
  Book
} = require('@model/book.js')
const router = Router({
  prefix: '/v1/book'
})
const {
  HotBook
} = require('@model/hot-book.js')
const {
  PositiveIntegerValidator,
  SearchValidator
} = require('@validator')
router.get('/hot_list', async (ctx, next) => {
  const favors = await HotBook.getAll()
  ctx.body = {
    key: favors
  }
})
router.get('/:id/book', async (ctx, next) => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const id = v.get('path.id')
  const detail = await Book.detail(v.get('path.id'))
  ctx.body = detail
})
router.get('/search', async ctx => {
  const v = await new SearchValidator().validate(ctx)
  const {
    q,
    start,
    count
  } = v.get('query')
  const result = await Book.searchFromYuShu(q, start, count)
  ctx.body = result
})
module.exports = router