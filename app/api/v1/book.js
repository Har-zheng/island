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
  SearchValidator,
  AddShortCommentValidator
} = require('@validator')
const {
  Auth
} = require('@middlewares/auth.js')
const {
  Favor
} = require('@model/favor.js')
const {
  Comment
} = require('@model/book-comment.js')
const {
  success
} = require('@lib/helper.js')
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

// 获取当前用户的点赞的数量
router.get('/favor/count', new Auth().m, async ctx => {
  const count = await Book.getMyFavorBookCount(ctx.auth.uid)
  ctx.body = {
    count
  }
})
// 获取本书点赞的状况
router.get('/:bookId/favor', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'bookId'
  })
  const favor = await Favor.getBookFavor(v.get('path.bookId'), ctx.auth.uid)
  ctx.body = favor
})


// 书籍的短评

router.post('/add/short_commit', new Auth().m, async ctx => {
  const v = await new AddShortCommentValidator().validate(ctx, {
    id: 'book_id'
  })
  const {
    book_id,
    content
  } = v.get('body')
  await Comment.addCommit(book_id, content)
  success()
})

// 获取书籍短评内容
router.get('/:book_id/short_commit', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'book_id'
  })
  const commit = await Comment.getCommit(v.get('path.book_id'))
  ctx.body = commit
})

// 热门

router.get('/hot_keyword', async ctx => {
  ctx.body = {
    "hot": [
      'javaScript',
      '哈利波特',
      '路遥',
      '金庸'
    ]
  }
})

module.exports = router