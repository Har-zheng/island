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
class StockArticle extends Model {
  // 添加文章
  static async addArticle(articleData) {
    const createTime = new Date().getTime().toString()
    console.log(createTime);
    return await StockArticle.create({ ...articleData, createTime })
  }
  static async getAll() {
    const article = await StockArticle.findAll({
      order: [[ 'id', 'DESC' ]]
    })
    return article
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
StockArticle.init({
  index: Sequelize.INTEGER,
  image: Sequelize.STRING,
  author: Sequelize.STRING, //作者
  title: Sequelize.STRING, // 标题
  article: Sequelize.STRING(5000),
  createTime:{
    type: Sequelize.STRING(128),
    unique: false
  }
},
  {
    sequelize,
    timestamps: true,
    tableName: 'stock_article'
  }
)

StockArticle.sync({ alter: true })
module.exports = {
  StockArticle
}