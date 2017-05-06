class Lanterns {
  constructor (config) {
    this.config = config

    // generate the raw lights
    this._raw = []

    Object.keys(config)
      .forEach(key => {
        let n = 0
        config[key]
          .forEach(item => {
            for (var i = 0; i < (item.count || 1); i++) {
              this._raw.push(Object.assign({}, item, {$: [key, n++]}))
            }
          })
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

}


if(typeof module != 'undefined') module.exports = Lanterns


function interpolate(arr, prop) {

  // interpolate positions
  var last = 0
  var next = 0
  for (var i = 0; i < arr.length; i++) {
    if(typeof(arr[i][prop]) == 'undefined') {
      for(var j = i; j < arr.length; j++) {
        if(typeof(arr[j][prop]) != 'undefined') {
          next = arr[j][prop]
          break
        }
      }
      for (var k = i; k < j; k++) {
        const off = (k - i + 1) / (j - i + 1)
        arr[k][prop] = last + (next - last) * off
      }
    }

    last = arr[i][prop]
  }

}
