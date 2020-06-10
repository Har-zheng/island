const util = require('util')
const axios = require('axios')
const {
  AuthFailed
} = require('../../core/http-exception')
class WXManger {
  static async codeToToken(code) {
    const url = util.format(global.config.wx.loginUrl,
      global.config.wx.appId,
      global.config.wx.appSecret
    )
    const result = await axios.get(url)
    if (result.status !== 200) {
      throw new AuthFailed('openid获取失败')
    }
    const errcode = result.data.errcode
    if (errcode !== 0) {
      throw new AuthFailed('openid获取失败' + errcode)
    }

  }
}