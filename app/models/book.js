const { Sequelize, Model } = require('sequelize')
const util = require('util')
const config = require('@root/config/config.js')
const axios = require('axios')
const { sequelize } = require('@core/db.js')
const { Favor } = require('./favor')
class Book extends Model {
  constructor(id){
    super()
    this.id = id
  }
  static async detail(id){
    const url = util.format(config.yushu.detailUrl, id)
    const detail = await axios.get(url)
    return detail.data
  }
  static async searchFromYuShu(q, start = 1, count = 20, summary = 1){
    const url = util.format(config.yushu.keywordUrl, encodeURI(q), count, start, summary )
    const result = await axios.get(url)
    return result.data
  }
  static async getMyFavorBookCount(uid){
    const count = await Favor.count({
      where: {
        type: 400,
        uid
      }
    })
    return count
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