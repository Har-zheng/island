const {  Movie,
  Sentence,
  Music  } = require('../models/classic')
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
        art = await Sentence.findOne(findr)
      default:
        break;
    }
  }
}
module.exports = {
  Art
}