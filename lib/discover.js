const fs = require('fs')
const dgram = require('dgram')

const network = {}
const output = 'network.json'
const messageRE = /BUNCH=(.+)/

const socket = dgram.createSocket('udp4', {reuseAddr: true})
socket.on('listening', () => socket.setBroadcast(true))

socket.on('message', ( data, rinfo ) => {
  const message = data.toString()

  console.log(`⬅︎ from ${rinfo.address} : ${message}`)

  const match = message.match(messageRE)

  if(match) {

    const id = match[1]
    const {address, port} = rinfo

    if(network[id]) {
      if(network[id].address != address)
        console.error(`ERROR: MULTIPLE ADDRESSES FOUND FOR ${id}`)

    } else {
      network[id] = {
        address, port
      }

      console.log(`Adding ${id} to ${output}`)
      fs.writeFile(output, JSON.stringify(network, null, 2), (err) => {
        if(err) console.error(err)
        else console.log(`wrote ${output}`)
      })
    }
  }
})

socket.bind(5053)
