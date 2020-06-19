const { sequelize } = require('../../core/db')
const { Sequelize, Model, where  } = require('sequelize')
const { LikeError } = require('../../core/http-exception')
const { Art } = require('./art')
class Favor extends Model{
 static async like(art_id, type, uid){
  const favor = await Favor.findOne({
    where: {
      art_id,
      type,
      uid
    }
  })
  if(favor){
    throw new LikeError()
  }
  sequelize.transaction( async t => {
    await Favor.create({
      art_id,
      type,
      uid
    }, { transaction: t })
    const art = Art.getData(art_id, type)
    art.increment('fav_nums', { by: 1, transaction: 1})
  })
 }
}
Favor.init({
  uid: Sequelize.INTEGER,
  art_id: Sequelize.INTEGER,
  type: Sequelize.INTEGER
})