const requireDirectory = require("require-directory");
const Router = require('koa-router')
const session = require('koa-session')

class InitManager {
  static initCore(app){
    InitManager.app = app
    InitManager.initAccessToken()
    InitManager.initLoadRouters()
    InitManager.loadConfig()
  }
  static loadConfig(path = ''){
    const configPath = path || process.cwd() + '/config/config.js'
    const config = require(configPath)
    global.config = config
  }
  static initLoadRouters() {
    // patch config
    const apiDirectory = `${process.cwd()}/app/api`
    requireDirectory(module, apiDirectory, {
      visit: whenLoadModule
    })

    function whenLoadModule(obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }
  static initAccessToken(){
    InitManager.app.keys = ['some secret hurr'];
    const CONFIG = {
      key: 'koa:sess',   //cookie key (default is koa:sess)
      maxAge: 7200,  // cookie的过期时间 maxAge in ms (default is 1 days)
      overwrite: true,  //是否可以overwrite    (默认default true)
      httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
      signed: true,   //签名默认true
      rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
      renew: false,  //(boolean) renew session when session is nearly expired,
   };
   InitManager.app.use(session(CONFIG,  InitManager.app))
  }
}
module.exports = InitManager