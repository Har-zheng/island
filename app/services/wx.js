const util = require('util')
const axios = require('axios')
const fs=require('fs')//引用fs文件管理
const path = require('path')//引用路径
const fileName = path.resolve(__dirname, './AccseeToken.json')//文件路径
const {
  User
} = require('../models/user')
const {
  AuthFailed
} = require('../../core/http-exception')
const {
  generateToken
} = require('../../core/util')
const {
  Auth
} = require('../../middlewares/auth')
class WXManger {
  static async codeToToken(code) {
    const url = util.format(global.config.wx.loginUrl,
      global.config.wx.appID,
      global.config.wx.appSecret,
      code
    )
    const result = await axios.get(url)
    if (result.status !== 200) {
      throw new AuthFailed('openid获取失败')
    }
    const errcode = result.data.errcode
    if (errcode) {
      throw new AuthFailed('openid获取失败' + errcode)
    }
    const user = await User.getUserByOpenid(result.data.openid)
    if (!user) {
      user = await User.registerByOpenid(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }


  static async accessToken() {
    const updateAccessToken = async () => {//获取最新的accesstoken
      const url = util.format(global.config.wx.accessTokenUrl,
        global.config.wx.appID,
        global.config.wx.appSecret,
      )
      const { data: { access_token } } = await axios.get(url)
      if (access_token) {//如果成功获取则写入文件
        fs.writeFileSync(fileName, JSON.stringify({//写文件，JSON.stringify将对象转成字符串
          access_token,//写入当前获取到的accesstoken
          createTime: new Date()//获取服务器时间
        }))
      } else {//如果没有获取到则再此执行
        await updateAccessToken()
      }
    }
    try {//异常处理
      const read = fs.readFileSync(fileName, 'utf8')//先获取文件
      const readObj = JSON.parse(read)//将获取到的字符串转成对象
      const createTime = new Date(readObj.createTime).getTime()//获取当前文件的创建时间毫秒
      const nowTime = new Date().getTime()//获取当前毫秒时间
      if ((nowTime - createTime) / 1000 >= 7200) {//当前时间减去创建时间除1000得出秒，如果当前秒大于等于7200小时则超出2小时该accesstoken过期
        await updateAccessToken()//过期则重新获取
        await accessToken()
      }
      return { access_token: readObj.access_token }//返回accesstoken值
    } catch {//如果获取不到文件，表示还没创建则执行
      await updateAccessToken()
      await accessToken()
    }
    setInterval(async () => {
      await updateAccessToken()
    }, (7200 - 300) * 1000);
  }
}
module.exports = {
  WXManger
}