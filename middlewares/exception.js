// 全局返回处理
const {
  HttpException
} = require('../core/http-exception')
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 开发环境
    // 生成环境
    // 开发环境 不是 http-exception
    const  isHttpException = error instanceof HttpException
    const isDev = global.config.environment === 'dev'
    if(isDev && !isHttpException){
      throw error
    }
    const {
      msg,
      code
    } = error
    const {
      method,
      path
    } = ctx
    if (isHttpException) {
      ctx.body = {
        msg: msg,
        error_code: error.errorCode,
        request: `${method}${path}`
      }
      ctx.status = error.code
    }else{
      // 处理未知异常
      ctx.body = { 
        msg:  'we made a mistake ',
        error_code: 999,
        request: `${method}${path}`
      }
      ctx.status = 500
    }
  }
}
module.exports = catchError