const {  sequelize } = require('@core/db.js');
const { Model, Sequelize } = require('sequelize');
class HotBook extends Model{
  static async getAll(){
    const books = await HotBook.findAll({
      order: ['index']
    })
    const ids = []
    books.forEach(book => {
      ids.push(book.id)
    });
  }
  // 不能循环查询数据库    把查询的书籍放在数组中 通复杂查询Op.in  的方式查询数据

}
HotBook.init({
  index: Sequelize.INTEGER,
  image: Sequelize.STRING,
  author: Sequelize.STRING,
  title: Sequelize.STRING
})
module.exports = {
  HotBook
}