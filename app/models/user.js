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
    const user = User.findOne({
      openid
    })
    return user
  }
  static async registerByOpenid(openid) {
    return await User.create({
      openid
    })
  }
  // 保存用户信息
  static async saveWxInfo(wxInfo) {

    return await User.create({ ...wxInfo })
  }
  //绑定用户手机号
  static async saveWxPhone(phone, id) {
    console.log(typeof phone);
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

module.exports = { User }
// 数据迁移  sql 更新 风险