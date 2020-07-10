module.exports = {
  // prod
  environment: "dev",
  dataBase: {
    dbName: 'island',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678'
  },
  security: {
    secretKey: "abcdefg",
    expiresIn: 60 * 60 * 24 * 30
  },
  wx: {
    appID: 'wxab28fe99a0747361',
    appSecret: '0ced3fc5b101e435d7b73f13b553b258',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    // loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code'
  },
  yushu: {
    detailUrl: 'http://t.yushu.im/v2/book/id/%s',
    keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
  },
  host_url: 'http://localhost:3000/'
}