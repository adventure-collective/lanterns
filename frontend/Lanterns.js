
class Lanterns {
  constructor (config) {
    this.config = config


    // generate the raw lights
    this._raw = []

    Object.keys(config)
      .forEach(key => {
        config[key]
          .forEach(item => {
            this._raw.push(item)
          })
      })
  }

  raw() {
    return this._raw
  }

}


if(typeof module != 'undefined') module.exports = Lanterns
