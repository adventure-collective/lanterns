
class Lanterns {
  constructor (config) {
    this.config = config


    // generate the raw lights
    this._raw = []

    Object.keys(config)
      .forEach(key => {
        config[key]
          .forEach(item => {
            for (var i = 0; i < (item.count || 1); i++) {
              this._raw.push(item)
            }
          })
      })

    this._raw.forEach(item => {
      delete item.count
    })
  }

  raw() {
    return this._raw
  }

}


if(typeof module != 'undefined') module.exports = Lanterns
