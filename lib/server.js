const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const network = require('../network.json')
const bunch_id = Object.keys(network)[0]
const bunch = network[bunch_id]
console.log(`Using bunch:${bunch_id} (${bunch.address}:${bunch.port})`)


const dgram = require('dgram')
const client = dgram.createSocket('udp4')


app.use(express.static(path.join(__dirname, '../frontend')))

app.use(bodyParser.text())

app.post('/data', (req, res) => {

  client.send(Buffer.from(`SET ${req.body}`), bunch.port, bunch.address);

  res.send("NICE CHOICE")
})

app.listen(3000)
