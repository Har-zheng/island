module.exports = {
  // prod
  environment: "dev",
  dataBase: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456'
  },
  security: {
    secretKey: "abcdefg",
    expiresIn: 60 * 60 * 24 * 30
  },
  wx: {
    appID: 'wxf8546d0bdc57684e',
    appSecret: 'bcd63d5c0767f535540f365c3bfc5d3b',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
    accessTokenUrl: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s',
    msg_sec_check: 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=%s'
    // loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code'
  },
  // http://t.yushu.im/v2/book/id/%s
  yushu: {
    detailUrl: 'http://t.yushu.im/v2/book/id/%s',
    keywordUrl: 'http://t.yushu.im/v1/book/search?q=%s&count=%s&start=%s&summary=%s'
  },
  host_url: 'https://wx.hongzhen.top/'
}
