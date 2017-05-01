const dgram = require('dgram')

const address = '192.168.0.32'
const brightness = 3 // 0 -> 127


const client = dgram.createSocket('udp4')

const hex = (r,g,b) =>
  ("0" + parseInt(r,10).toString(16)).slice(-2) +
  ("0" + parseInt(g,10).toString(16)).slice(-2) +
  ("0" + parseInt(b,10).toString(16)).slice(-2)

const inter = setInterval(() => {

  const now = Date.now()

  var colours = Array.from({length: 16})
    .map((v, i ) => {
      const colour = hex(
        (Math.sin(((now + (i * 80))/100) + 0) + 1) * brightness,
        (Math.sin(((now + (i * 80))/100) + 2) + 1) * brightness,
        (Math.sin(((now + (i * 80))/100) + 4) + 1) * brightness
      )

      return colour

    })


  client.send(Buffer.from(`SET ${colours.join(' ')}`), 5000, address);

  // console.log(colour)

  console.log(`SET ${colours.join(' ')}`)
}, 20)
