const Router = require('koa-router')
const {
  Book
} = require('@model/book.js')
const router = Router({
  prefix: '/v1/article'
})
const {
  HotBook
} = require('@model/hot-book.js')
const {
  StockArticle
} = require('@model/stock-article.js')
const {
  User
} = require('@model/user.js')

const {
  PositiveIntegerValidator,
  SearchValidator,
  AddShortCommentValidator,
  CIdValidator,
  EmailValidator
} = require('@validator')
const { Auth } = require('@middlewares/auth.js')
const {
  Favor
} = require('@model/favor.js')
const {
  Comment
} = require('@model/book-comment.js')
const {
  success
} = require('@lib/helper.js')
const util = require('util')
const axios = require('axios')
const {
  WXManger
} = require('@services/wx')
router.get('/hot_list', async (ctx, next) => {
  const favors = await HotBook.getAll()
  ctx.body = {
    key: favors
  }
})

// 添加文章
router.post('/add/stockArticle', async ctx => {
  const articleData = ctx.request.body
  console.log(articleData);
  await StockArticle.addArticle(articleData)
  success()
})
// 查询文章列表
router.get('/articleList', async ctx => {
  const articleList = await StockArticle.getAll()
  ctx.body = {
    list: articleList
  }
})
//保存用户信息
router.post('/saveWxInfo', async (ctx, next) => {
  const wxInfo = ctx.request.body
  console.log(wxInfo);
  let wx = await User.saveWxInfo(wxInfo)

  ctx.body = {
    ...wx.dataValues
  }
})
//保存手机号
router.post('/saveWxPhone', async (ctx, next) => {
  const {  phone, id } = ctx.request.body
  console.log(phone, id);
  await User.saveWxPhone( phone, id )
  success()
})
// 解密用户手机号
//https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=ACCESS_TOKEN
 router.post('/getuserphonenumber', async ctx => {
   const {access_token, code } = ctx.request.body
  const result = await axios.post(`https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${access_token}`, { code })
  console.log(result);
  ctx.body = {
    result
  }
})
// 获取用户列表
router.get('/wxUserList', async (ctx, next) => {
  const wxUserList = await User.wxUserList()
  ctx.body = {
    code:20000,
    list: wxUserList
  }
})


router.get('/columns', async (ctx, next) => {
  const result = await axios.get('http://api.vikingship.xyz/api/columns')
  console.log(result.data)
  ctx.body = {
    ...result.data
  }
})
router.get('/columns/:cid', async (ctx, next) => {
  // 封装后读取  url  地址参数的函数  方法
  const v = await new CIdValidator().validate(ctx, {
    id: 'cid'
  })
  console.log(v)
  const cid = v.get('path.cid')
  console.log(cid)
  const result = await axios.get(`http://api.vikingship.xyz/api/columns/${cid}`)
  console.log(result.data)
  ctx.body = {
    ...result.data
  }
})
router.get('/columns/:cid/posts', async (ctx, next) => {
  // 封装后读取  url  地址参数的函数  方法
  const v = await new CIdValidator().validate(ctx, {
    id: 'cid'
  })
  const cid = v.get('path.cid')
  const result = await axios.get(`http://api.vikingship.xyz/api/columns/${cid}/posts`)
  console.log(result.data)
  ctx.body = {
    ...result.data
  }
})
//登录
router.post('/user/login', async ctx => {
  const v = await new EmailValidator().validate(ctx)
  const { email, password } = v.get('body')
  console.log(email, password)
  const result = await axios.post('http://api.vikingship.xyz/api/user/login', { email, password })
  console.log(result)
  ctx.body = {
    ...result.data
  }
})



router.get('/:id/detail', async (ctx, next) => {
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


// 添加书籍的短评
router.post('/add/short_comment', new Auth().m, async ctx => {

  const v = await new AddShortCommentValidator().validate(ctx, {
    id: 'bookId'
  })

  const {
    bookId,
    content
  } = v.get('body')

  // 添加短评前  验证是否敏感词汇
  const wxInfo = await WXManger.accessToken()
  const access_token = wxInfo.access_token
  const url = util.format(global.config.wx.msg_sec_check,
    access_token
  )
  const result = await axios.post(url, {
    content
  })
  console.log(result.data)
  if (result.data.errcode === 0) {
    await Comment.addCommit(bookId, content)
    success()
  } else {
    ctx.body = {
      code: 200,
      errcode: result.data.errcode,
      errmsg: result.data.errmsg
    }

  }
})

// 获取书籍短评内容
router.get('/:bookId/short_comment', new Auth().m, async ctx => {
  const v = await new PositiveIntegerValidator().validate(ctx, {
    id: 'bookId'
  })
  const commit = await Comment.getCommit(v.get('path.bookId'))
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

// exclude  忽略字段   在api 接口中使用这个方法比较好


module.exports = router