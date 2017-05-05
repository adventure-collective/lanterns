const brightness = 10 // 0 -> 127

// use the first bunch listed in network.json
const network = require('./network.json')
const bunch_id = Object.keys(network)[0]
const bunch = network[bunch_id]

console.log(`Using bunch:${bunch_id} (${bunch.address}:${bunch.port})`)

const dgram = require('dgram')
const client = dgram.createSocket('udp4')

const inter = setInterval(() => {

  const now = Date.now()

  const colour = String.fromCharCode(
    (Math.sin((now/100) + 0) + 1) * brightness,
    (Math.sin((now/100) + 2) + 1) * brightness,
    (Math.sin((now/100) + 4) + 1) * brightness
  )

  client.send(Buffer.from(`FILL ${colour}`), bunch.port, bunch.address)

}, 10)
