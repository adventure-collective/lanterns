const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.use(bodyParser.text())

app.post('/data', (req, res) => {

  console.log(req.body)
  client.send(Buffer.from(`SET ${req.body}`), 5000, address);

  res.send("OKA")
})

app.listen(3000)



const dgram = require('dgram')

const address = '192.168.43.104'

const brightness = 50 // 0 -> 127


const client = dgram.createSocket('udp4')

const hex = (r,g,b) =>
  ("0" + parseInt(r,10).toString(16)).slice(-2) +
  ("0" + parseInt(g,10).toString(16)).slice(-2) +
  ("0" + parseInt(b,10).toString(16)).slice(-2)
