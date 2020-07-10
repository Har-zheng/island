const {
  sequelize
} = require('@core/db.js');
const {
  Model,
  Sequelize,
  Op
} = require('sequelize');
const {
  Favor
} = require('./favor')
class HotBook extends Model {
  static async getAll() {
    const books = await HotBook.findAll({
      order: ['index']
    })
    const ids =   books.map(book => book.id);
    const favors = await Favor.findAll({
      where: {
        art_id: {
          [Op.in]: ids
        }
      },
      group: ['art_id'],
      attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']]
    })
    books.forEach(book => {
      HotBook._getEachBookStatus(book, favors)
    })

    return books
  }
  // 不能循环查询数据库  把查询的书籍放在数组中 通复杂查询Op.in  的方式查询数据
  static _getEachBookStatus(book, favors) {
    let count = 0
    favors.forEach(favor => {
      if (book.id === favor.art_id) {
        count = favor.get('count')
      }
    })
    book.setDataValue('favNums', count)
    return book
  }

}
HotBook.init({
  index: Sequelize.INTEGER,
  image: Sequelize.STRING,
  author: Sequelize.STRING,
  title: Sequelize.STRING
},
  {
    sequelize,
    tableName: 'hot_book'
  }
)
module.exports = {
  HotBook
}