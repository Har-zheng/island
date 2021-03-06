const {
  Sequelize,
  Model
} = require('sequelize')
const {
  sequelize
} = require('../../core/db')

const classicFields = {
  image: Sequelize.STRING,
  content: Sequelize.STRING,
  pubdate: Sequelize.DATEONLY,
  fav_nums: {
    type: Sequelize.INTEGER,
    default: 0
  },
  title: Sequelize.STRING,
  type: Sequelize.TINYINT
}

class Movie extends Model {

}
Movie.init(classicFields, {
  sequelize,
  tableName: 'movie'
})


class Sentence extends Model {

}
Sentence.init(classicFields, {
  sequelize,
  tableName: 'sentence'
})
class Music extends Model {

}
const music = Object.assign({
  url: Sequelize.INTEGER
}, classicFields)
Music.init(music, {
  sequelize,
  tableName: "music"
})

module.exports = {
  Movie,
  Sentence,
  Music
}