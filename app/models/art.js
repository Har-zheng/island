const {
  Movie,
  Sentence,
  Music
} = require('../models/classic');
const {
  Op
} = require('sequelize');
const {
  NotFound
} = require('@core/http-exception.js')
class Art {
  constructor(art_id, type) {
    this.art_id = art_id
    this.type = type
  }

  async getDetail(uid) {
    // 避免导入逻辑的错误  放在执行阶段
    const {
      Favor
    } = require('./favor')
    const art = await Art.getData(this.art_id, this.type)
    if (!art) {
      throw new NotFound()
    }
    const like = await Favor.userLikeIt(this.art_id, this.type, uid)
    return {
      art: art,
      likeStatus: like
    }
  }

  static async getData(artId, type, useScope = true) {
    let art = null;
    const findr = {
      where: {
        id: artId
      }
    }
    const scope = useScope ? 'bh' : null
    switch (type) {
      case 100:
        art = await Movie.scope(scope).findOne(findr)
        break;
      case 200:
        art = await Music.scope(scope).findOne(findr)
        break;
      case 300:
        art = await Sentence.scope(scope).findOne(findr)
        break;
      case 400:
        const {Book} = require('@model/book.js')
        art = await Book.scope(scope).findOne(findr)
        if(!art){
          art = await Book.create({
            id: artId
          })
        }
        break
      default:
        break;
    }
    return art
  }
  static async getList(artInfoList) {
    const artInfoObj = {
      100: [],
      200: [],
      300: []
    }
    for (let artInfo of artInfoList) {
      artInfoObj[artInfo.type].push(artInfo.art_id)
    }
    const arts = []
    for (let key in artInfoObj) {
      let ids = artInfoObj[key]
      if (!ids.length) {
        continue
      }
      key = parseInt(key)
      arts.push(await Art._getListByType(ids, key))
    }
    return arts
  }
  static async _getListByType(ids, type) {
    let arts = null;
    // Op 复杂查询条件  in  某字段数组传递查询
    const findr = {
      where: {
        id: {
          [Op.in]: ids
        }
      }
    }
    const scope = 'bh'
    switch (type) {
      case 100:
        arts = await Movie.scope(scope).findAll(findr)
        break;
      case 200:
        arts = await Music.scope(scope).findAll(findr)
      case 300:
        arts = await Sentence.scope(scope).findAll(findr)
      case 300:
        arts = await Sentence.scope(scope).findAll(findr)
      case 400:
        break
      default:
        break;
    }
    return arts
  }
}
module.exports = {
  Art
}