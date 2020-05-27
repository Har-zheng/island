class A{
  constructor(){
    this.nameA ='a'
  }
  validateA(){
    console.log('a')
  }
}
class B extends A {
  constructor(){
    super()
    this.nameB = 'b'
  }
  validateB(){
    console.log('b')
  }
}
class C extends B {
  constructor(){
    super()
    this.nameC = 'b'
  }
  validateC(){
    console.log('c')
  }
}

var c = new C()
const members = findMembers(c, 'name', 'validate')
function findMembers(c, name, validate) {
  console.log(c.constructor.prototype )
  for(let i in c){
    if(c.hasOwnProperty(i) && typeof c[i] == "function"){

      console.log(i)
    }
  }

}
console.log(members)