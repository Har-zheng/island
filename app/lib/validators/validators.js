const {
  LinValidator,
  Rule
} = require('../../../core/lin-validator')
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
class RegisteerValidator extends LinValidator{
  constructor(){
    super()
    this.email = [
      new Rule('isEmail', '不符合Email规范')
  ]
  this.password1 = [
    // 用户 指定范围 & ^
    new Rule('isLength', '密码至少6个字符，最多32个字符',{
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
  validatePassword(vals){
    const paw1 = vals.body.password1
    const paw2 = vals.body.password2
    if(paw1 !== paw2){
      throw new Error('两个密码必须相等')
    }
  }
}
module.exports = { 
  PositiveIntegerValidator,
  RegisteerValidator }