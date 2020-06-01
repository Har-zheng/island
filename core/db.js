const Sequelize = require('sequelize')


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
  define: {}
})
sequelize.sync()
module.exports = {
  sequelize
}