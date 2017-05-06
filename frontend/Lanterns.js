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


    this._data = new Uint8ClampedArray(this._raw.length * 3)

    // data separated by bunch for sending
    this._datas = []

    // create linked sub arrays in better form for writing
    let from = 0
    this._indices.forEach(([key, to]) => {
      this._datas.push([key, this._data.subarray(from, to * 3)])
      from = to * 3
    })


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
    for (var i = 0; i < array.length; i++) {
      this._data[i*3]     = array[i].r
      this._data[i*3 + 1] = array[i].g
      this._data[i*3 + 2] = array[i].b
    }

    this._writes =
      this._datas.map(([key, array]) =>
        key + ' ' + String.fromCharCode.apply(String, array)
      )
  }


  asTHREE() {
    return this._raw.map(light => {
      const {x,y,z} = light

      const geometry = new THREE.SphereGeometry( 0.1, 10, 10 )
      const material = new THREE.MeshBasicMaterial( { color: 0 } )
      const lantern = new THREE.Mesh( geometry, material )

      Object.assign(lantern.position, {x,y,z})

      return lantern
    })
  }

  writeTHREE(meshes) {
    for (var i = 0; i < meshes.length; i++) {
      this._data[i*3]     = meshes[i].material.color.r * 255
      this._data[i*3 + 1] = meshes[i].material.color.g * 255
      this._data[i*3 + 2] = meshes[i].material.color.b * 255
    }

    this._writes =
      this._datas.map(([key, array]) =>
        key + ' ' + String.fromCharCode.apply(String, array)
      )
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
