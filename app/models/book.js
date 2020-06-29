const { Sequelize, Model } = require('sequelize')
const util = require('util')
const config = require('@root/config/config.js')
const axios = require('axios')
const { sequelize } = require('@core/db.js')
class Book extends Model {
  constructor(id){
    super()
    this.id = id
  }
  async detail(){
    const url = util.format(config.yushu.detailUrl, this.id)
    const detail = await axios.get(url)
    return detail.data
  }

}
Book.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fav_nums: {
    type: Sequelize.INTEGER,
    defaul: 0
  }},
  {
    sequelize,
    tableName: 'book'
  })
module.exports = { 
  Book
}