const {Sequelize, Model} = require('sequelize')
const { clone, unset } = require('lodash')
// Model 上不要定义构造函数

const { 
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').dataBase

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging:true,
  timezone: '+08:00',
  define: {
    // create_time update_time delete_time
    timestamp: true,
    paranoid:true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    undersocored:true,
    freezeTableName: true
  }
})
Model.prototype.toJSON = function(){
  let data = clone(this.dataValues)
  unset(data, 'updated_at')
  unset(data, 'created_at')
  unset(data, 'deleted_at')
  return data
}
sequelize.sync({
  // 删除数据 重新生成数据库
  force: false
})
module.exports = {
  sequelize
}