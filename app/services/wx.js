const util = require('util')
const axios = require('axios')
const fs = require('fs')//引用fs文件管理
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
    const { data: {session_key, openid}, status, errcode  } =result
    console.log(openid);
    if (status !== 200) {
      throw new AuthFailed('openid获取失败')
    }
    if (errcode) {
      throw new AuthFailed('openid获取失败' + errcode)
    }
    let user = await User.getUserByOpenid(openid)
    console.log(user);
    if (!user) {
      user = await User.registerByOpenid(openid)
    }
    return { token: generateToken(user.id, Auth.USER),userId:user.id,session_key  }
  }
  static async updateAccessToken() {//获取最新的accesstoken
    const url = util.format(global.config.wx.accessTokenUrl,
      global.config.wx.appID,
      global.config.wx.appSecret,
    )
    const res = await axios.get(url)
    console.log(res);
    
    const {data: { access_token }} =res
    if (access_token) {//如果成功获取则写入文件
      fs.writeFileSync(fileName, JSON.stringify({//写文件，JSON.stringify将对象转成字符串
        access_token,//写入当前获取到的accesstoken
        createTime: new Date()//获取服务器时间
      }))
    
    } else {//如果没有获取到则再此执行
      await this.updateAccessToken()
      console.log('updateAccessToken');
    }
  }

  static async accessToken() {
    try {//异常处理
      const read = fs.readFileSync(fileName, 'utf8')//先获取文件
      const readObj = JSON.parse(read)//将获取到的字符串转成对象
      const createTime = new Date(readObj.createTime).getTime()//获取当前文件的创建时间毫秒
      const nowTime = new Date().getTime()//获取当前毫秒时间
      if ((nowTime - createTime) / 1000 >= 7200) {//当前时间减去创建时间除1000得出秒，如果当前秒大于等于7200小时则超出2小时该accesstoken过期
        await this.updateAccessToken()//过期则重新获取
        await this.accessToken()
        console.log('过期');
      }
      return { access_token: readObj.access_token }//返回accesstoken值
    } catch {//如果获取不到文件，表示还没创建则执行
      await this.updateAccessToken()
      await this.accessToken()
    }
  }
}
module.exports = {
  WXManger
}