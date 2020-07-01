const {
  LinValidator,
  Rule
} = require('../../core/lin-validator-v2')
const {
  User
} = require('../models/user')
const {
  LoginType,
  ArtType
} = require('../lib/enum')
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', '需要正整数', {
        min: 1
      })
    ]
  }
}
class RegisteerValidator extends LinValidator {
  constructor() {
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规范')
    ]
    this.password1 = [
      // 用户 指定范围 & ^
      new Rule('isLength', '密码至少6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', "^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,20}$")
    ]
    this.password2 = this.password1
    this.nickname = [
      new Rule('isLength', '昵称不符合长度规范', {
        min: 4,
        max: 32
      })
    ]
  }
  validatePassword(vals) {
    const paw1 = vals.body.password1
    const paw2 = vals.body.password2
    if (paw1 !== paw2) {
      throw new Error('两个密码必须相等')
    }
  }
  async validateEmail(vals) {
    const email = vals.body.email
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (user) {
      throw new Error('email已经存在')
    }
  }
}
class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.account = [
      new Rule('isLength', '不符合账号规则', {
        min: 4,
        max: 32
      })
    ]
    this.secret = [
      new Rule('isOptional'),
      new Rule('isLength', '至少六个字符', {
        min: 6,
        max: 128
      })
    ]
  }
  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error('Type字段是必填参数')
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error('Type字段不合法')
    }
  }
}
class NotEmptyValidator extends LinValidator{
  constructor(){
    super()
    this.token = [
      new Rule('isLength', 'token不能为空', {
        min: 1
      })
    ]
  }
}
function checkArtType(vals) {
  let type = vals.body.type || vals.path.type
  if(!type){
    throw new Error('type是必传字段')
  }
  type = parseInt(type)
  if(!ArtType.isThisType(type)){
    throw new Error('type参数不合法')
  }
}

class CheckedType{
  
}

class LikeValidator extends PositiveIntegerValidator{
  constructor(){
    super()
    this.validateType = checkArtType
  }
}
class ClassicValidator extends LikeValidator{

}

class SearchValidator extends LinValidator {
  constructor(){
    super()
    this.q = [
      
    ]
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisteerValidator,
  TokenValidator,
  NotEmptyValidator,
  LikeValidator,
  ClassicValidator
}