function isThisType(val) {
  for (const key in this) {
    if (this[key] === val) {
      return true
    }
  }
  return false
}
const LoginType = {
  USER_MINI_PROGRAM: 100,
  USER_EMAIL: 101,
  USER_MOBILE: 102,
  ADMIN_EMAIL: 200,
  isThisType
}
const roles = {
  USER: 8,
  ADMIN: 16,
  SUPER_ADMIN: 32
}
module.exports = {
  LoginType,
  roles
}