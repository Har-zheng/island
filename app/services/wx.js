const util = require('util')
const axios = require('axios')
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
    const url = util.format(global.config.wx.accessTokenUrl,
      global.config.wx.appID,
      global.config.wx.appSecret,
    )
    const result = await axios.get(url)
    return result.data
  }

}
module.exports = {
  WXManger
}