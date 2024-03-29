const bcrypt = require('bcryptjs')
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const { NotFound, AuthFailed } = require('../../core/http-exception')
class User extends Model {
  static async verifyEmailPassword(email, plainPassword) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new NotFound('账号不存在')
    }
    const correct = bcrypt.compareSync(plainPassword, user.password)
    if (!correct) {
      throw new AuthFailed('密码不正确')
    }
    return user
  }
  static async getUserByOpenid(openid) {
    console.log('openid' + openid);
    const user = await User.findOne({
      where: {
        openid
      }
    })
    console.log(user);
    return user
  }
  static async registerByOpenid(openid) {
    return await User.create({
      openid
    })
  }
  // 保存用户信息
  static async saveWxInfo(wxInfo) {
    const { userId } = wxInfo
    if (userId) {
      const user = await User.update({ ...wxInfo },
        { 'where': { 'id': userId } })
      return await User.findOne({ 'where': { 'id': userId } })
    }
    return await User.create({ ...wxInfo })
  }
  //绑定用户手机号
  static async saveWxPhone(phone, id) {
    const phoneSave = await User.update({ phone: phone },
      { 'where': { 'id': id } })
    return phoneSave
  }
  // 获取用户列表
  static async wxUserList() {
    const wxInfoList = await User.findAll({
      order: ['id']
    })
    return wxInfoList
  }
  // 查用户
  static async getUser(id) {
    const user = await User.findOne({ 'where': { 'id': id } })
    return user
  }
  // 设置vip user 或者取消
  static async setVip(id, isVip = true) {
    const user = await User.update({ vipUser: isVip },
      { 'where': { 'id': id } })
    return user
  }
}
User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phone: {
    type: Sequelize.STRING(128)
  },
  avatarUrl: {
    type: Sequelize.STRING
  },
  nickName: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  vipUser: { // 1普通用户  2 vip用户
    type: Sequelize.INTEGER
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const paw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', paw)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'user'
})
User.sync({ alter: true })
module.exports = { User }
// 数据迁移  sql 更新 风险


// FROM registry.cn-shanghai.aliyuncs.com/fengzhihao/nginx:1.15.12
// FROM registry.cn-hangzhou.aliyuncs.com/monsoul/nginx:vue

// LABEL version="1.0"
// LABEL maintainer="qichaosong@hcdlearning.com"
// LABEL maintainer="monsoul@msn.com"

// COPY dist/  /usr/html/
// COPY dist/  /usr/share/nginx/html