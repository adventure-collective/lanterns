var dgram = require('dgram')
var socket = dgram.createSocket('udp4', {reuseAddr: true})

socket.on('listening', () => socket.setBroadcast(true))

socket.on('message', ( data, rinfo ) => {
	console.log(`Message from ${rinfo.address} : ${data.toString()}`)
})

socket.bind(5053)
