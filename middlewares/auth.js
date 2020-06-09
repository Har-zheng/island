const basicAuth = require('basic-auth')
const {
  Forbbiden
} = require('../core/http-exception')
const jwt = require('jsonwebtoken')
class Auth {
  constructor(level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }
  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      // ctx.body = token
      let errMsg = 'token不合法'
      if (!userToken || !userToken.name) {
        throw new Forbbiden(errMsg)
      }
      try {
        var decode = jwt.verify(userToken.name, global.config.security.secretKey)
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          errMsg = 'token已过期'
        }
        throw new Forbbiden(errMsg)
      }
      if(decode.scope < this.level ){
        throw new Forbbiden('权限不足')
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next()
    }
  }
}
module.exports = {
  Auth
}