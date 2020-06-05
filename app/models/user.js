const bcrypt = require('bcryptjs')
const { sequelize } = require('../../core/db')
const { Sequelize, Model } = require('sequelize')
class User extends Model {

}
User.init({
  id:{
    type:Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true
  },
  nickname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING(128),
    unique: true
  },
  
  password: {
    type: Sequelize.STRING,
    set(val){
      const salt = bcrypt.genSaltSync(10)
      const paw = bcrypt.hashSync(val, salt)
      this.setDataValue('password', paw)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  },
  test: Sequelize.STRING
},{
  sequelize,
  tableName: 'user'
})

module.exports ={ User }
// 数据迁移  sql 更新 风险