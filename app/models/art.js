const {  Movie,
  Sentence,
  Music  } = require('../models/classic');
const { Op } = require('sequelize');
class Art {
  static async getData(artId, type){
    let art = null;
    const findr = {
      where: {
        id: artId
      }
    }
    switch (type) {
      case 100:
        art = await Movie.findOne(findr)
        break;
      case 200:
        art = await Music.findOne(findr)
      case 300:
        art = await Sentence.findOne(findr)
      default:
        break;
    }
    return art
  }
  static async getList(artInfoList){
    const artInfoObj =  {
      100: [],
      200: [],
      200: []
    }
    for(let artInfo  of  artInfoList){
      artInfoObj[artInfo.type].push(artInfo.art_id)
    }
    const arts = []
    for(let key in artInfoObj ){
      let ids = artInfoObj[key]
      if(!ids.length){
        continue
      }
      key = parseInt(key)
      arts.push(await Art._getListByType(ids, key))
    }
    return arts
  }
  static async _getListByType(ids, type){
    let arts = null;
    // Op 复杂查询条件  in  某字段数组传递查询
    const findr = {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    }
    switch (type) {
      case 100:
        arts = await Movie.findOne(findr)
        break;
      case 200:
        arts = await Music.findOne(findr)
      case 300:
        arts = await Sentence.findOne(findr)
      default:
        break;
    }
    return arts
  }
}
module.exports = {
  Art
}