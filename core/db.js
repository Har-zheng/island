const {
  Sequelize,
  Model
} = require('sequelize')
const {
  clone,
  unset
} = require('lodash')
// Model 上不要定义构造函数

const {
  dbName,
  host,
  port,
  user,
  password
} = require('../config/config').dataBase
const { host_url } = require('../config/config')

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',
  define: {
    // create_time update_time delete_time
    // timestamp: true,
    paranoid: true, // 不删除数据库条目,但将新添加的属性deletedAt设置为当前日期(删除完成时)
    underscored: true, // 将自动设置所有属性的字段参数为下划线命名方式
    scopes: {
      bh: {
        attributes: {
          exclude: ['updatedAt', 'deletedAt', 'createdAt', 'updated_at', 'created_at', 'deleted_at']
        }
      }
    },
  }
})
sequelize.sync({
  // 删除数据 重新生成数据库
  force: false
})
Model.prototype.toJSON = function () {
  let data = clone(this.dataValues)
  unset(data, 'updated_at')
  unset(data, 'created_at')
  unset(data, 'deleted_at')
  unset(data, 'updatedAt')
  unset(data, 'deletedAt')
  unset(data, 'createdAt')
  for (key in data) {
    if (key === 'image') {
      if (data[key] && !data[key].startsWith('http'))
        data[key] = host_url + data[key]
    }
  }
  return data
}

module.exports = {
  sequelize
}