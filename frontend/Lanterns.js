
class Lanterns {
  constructor (config) {
    console.log("constructed")

  }

  raw() {
    return [0,1,2,{x: 3}]
  }

  asArray() {

  }

  setArray(array) {

  }
}


if(typeof module != 'undefined') module.exports = Lanterns
