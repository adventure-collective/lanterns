const brightness = 10 // 0 -> 127
const N = 16 // Number of Pixels


// use the first bunch listed in network.json
const network = require('./network.json')
const bunch_id = Object.keys(network)[0]
const bunch = network[bunch_id]

console.log(`Using bunch:${bunch_id} (${bunch.address}:${bunch.port})`)

const dgram = require('dgram')
const client = dgram.createSocket('udp4')

setInterval(() => {

  const now = Date.now()

  var colours = Array.from({length: N})
    .map((v, i ) => {
      return String.fromCharCode(
        (Math.sin(((now + (i * 80))/100) + 0) + 1) * brightness,
        (Math.sin(((now + (i * 80))/100) + 2) + 1) * brightness,
        (Math.sin(((now + (i * 80))/100) + 4) + 1) * brightness
      )
    }).join('')

  client.send(Buffer.from(`SET ${colours}`), bunch.port, bunch.address);

}, 50)
