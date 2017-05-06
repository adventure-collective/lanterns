class Lanterns {
  constructor (config) {
    this.config = config

    // generate the raw lights
    this._raw = []

    this._indices = Object.keys(config)
      .map(key => {
        let n = 0
        config[key]
          .forEach(item => {
            for (var i = 0; i < (item.count || 1); i++) {
              this._raw.push(Object.assign({}, item, {$: [key, n++]}))
            }
          })

        return [key, this._raw.length]
      })

    // clean up
    this._raw.forEach(item => {
      delete item.count
    })

    // interpolate positions
    interpolate(this._raw, 'x')
    interpolate(this._raw, 'y')
    interpolate(this._raw, 'z')

  }

  raw() {
    return this._raw
  }

  asArray() {
    return this._raw.map(light => {
      const {x,y,z} = light
      return {x,y,z}
    })
  }

  writeArray(array) {
    this._writes = []

    let from = 0
    this._indices.forEach(([key, i]) => {

      const rgb = array.slice(from, i).map(
        v => String.fromCharCode(v.r, v.g, v.b)
      )
      this._writes.push(key + ' ' + rgb.join(''))

      from = i
    })
  }

}


if(typeof module != 'undefined') module.exports = Lanterns


function interpolate(arr, prop) {
  var prior = 0
  for (var i = 0; i < arr.length; i++) {
    if(typeof(arr[i][prop]) != 'undefined') {
      prior = arr[i][prop]
      continue
    }

    // look for the next good value
    var next = 0
    for(var j = i; j < arr.length; j++) {
      if(typeof(arr[j][prop]) != 'undefined') {
        next = arr[j][prop]
        break
      }
    }

    // fill in the blanks
    for (var k = i; k < j; k++) {
      const off = (k - i + 1) / (j - i + 1)
      arr[k][prop] = prior + (next - prior) * off
    }
  }

}
