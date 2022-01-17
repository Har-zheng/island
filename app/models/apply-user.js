

const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
const bcrypt = require('bcryptjs')

class ApplyUser extends Model {
  static async addUser(user) {
  const { phone,avatarUrl, nickName ,email, vipUser,password,openid  } = user
    return await ApplyUser.create({ phone,avatarUrl, nickName ,email, vipUser,password,openid   })
  }
  static async getApplyUser(bookId) {
    const list = await ApplyUser.findAll({
      order: ['id']
    })
    return list
  }
}

ApplyUser.init({
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
    type: Sequelize.STRING
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}, {
  sequelize,
  tableName: 'apply_user'
})
module.exports = {
  ApplyUser
}