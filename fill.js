const dgram = require('dgram')

const address = '192.168.11.112'
const brightness = 127 // 0 -> 127


const client = dgram.createSocket('udp4')

const hex = (r,g,b) =>
  ("0" + parseInt(r,10).toString(16)).slice(-2) +
  ("0" + parseInt(g,10).toString(16)).slice(-2) +
  ("0" + parseInt(b,10).toString(16)).slice(-2)

const inter = setInterval(() => {

  const now = Date.now()

  const colour = hex(
    (Math.sin((now/100) + 0) + 1) * brightness,
    (Math.sin((now/100) + 2) + 1) * brightness,
    (Math.sin((now/100) + 4) + 1) * brightness
  )

  client.send(Buffer.from(`FILL ${colour}`), 5000, address);

  console.log(colour)

}, 10)
