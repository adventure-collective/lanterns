const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const WebSocket = require('ws')

const network = require('../network.json')
const bunch_id = Object.keys(network)[0]
const bunch = network[bunch_id]
console.log(`Using bunch:${bunch_id} (${bunch.address}:${bunch.port})`)


const dgram = require('dgram')
const client = dgram.createSocket('udp4')


app.use(express.static(path.join(__dirname, '../frontend')))

app.use(bodyParser.text())

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const handle = (message) => {
  client.send(Buffer.from(`SET ${message}`), bunch.port, bunch.address)
}

wss.on('connection', ws =>
  ws.on('message', handle)
)

app.post('/send', (req, res) => {
  handle(req.body)
  res.send("NICE CHOICE")
})


server.listen(3000, () => {
  console.log(`⭐️ ⭐️  Online! Visit http://localhost:${server.address().port} to get started  ⭐️ ⭐️`)
})
