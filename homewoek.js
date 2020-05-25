class A {
  constructor(){
    this.nameA = 'a'
  }
  validateA(){
    console.log("A")
  }
}
class B extends A {
  constructor(){
    super()
    this.nameB = 'b'
  }
  validateB(){
    console.log("B")
  }
}
class C extends B{
  constructor(){
    super()
    this.nameC = 'c'
  }
  validateC(){
    console.log("C")
  }
}
const c = new C()
const findMaber = funFindMaber(c, 'name', 'validate' )
function funFindMaber(int, name, validate){
  console.log(int)
}
console.log(findMaber)