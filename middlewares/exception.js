const {
  HttpException
} = require('../core/http-exception')
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // 开发环境
    // 生成环境
    if(global.config.environment === 'dev'){
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
    if (error instanceof HttpException) {
      
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