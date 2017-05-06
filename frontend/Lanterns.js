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

    // clean up
    this._raw.forEach(item => {
      delete item.count
    })

    // interpolate positions
    var last = {x: 0, y: 0, z: 0}
    var next = {x: 0, y: 0, z: 0}
    for (var i = 0; i < this._raw.length; i++) {
      if(typeof(this._raw[i].x) == 'undefined') {
        for(var j = i; j < this._raw.length; j++) {
          if(typeof(this._raw[j].x) != 'undefined') {
            next.x = this._raw[j].x
            next.y = this._raw[j].y
            next.z = this._raw[j].z
            break
          }
        }
        for (var k = i; k < j; k++) {
          const off = (k - i + 1) / (j - i + 1)
          this._raw[k].x = last.x + (next.x - last.x) * off
          this._raw[k].y = last.y + (next.y - last.y) * off
          this._raw[k].z = last.z + (next.z - last.z) * off
        }
      }
    }


  }

  raw() {
    return this._raw
  }

}


if(typeof module != 'undefined') module.exports = Lanterns
