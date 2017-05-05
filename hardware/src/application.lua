print("Starting server")

-- a simple HTTP server
srv = net.createServer(net.TCP)
srv:listen(80, function(conn)
    conn:on("receive", function(sck, payload)
        handle_http(sck, payload)
    end)
    conn:on("sent", function(sck) sck:close() end)
end)
port, ip = srv:getaddr()
print(string.format("local HTTP server / port: %s:%d", ip, port))



udpSocket = net.createUDPSocket()
udpSocket:listen(5000)
udpSocket:on("receive", function(sck, data, port, ip)
    handle_udp(sck, data, port, id)
end)
port, ip = udpSocket:getaddr()
print(string.format("local UDP socket address / port: %s:%d", ip, port))



-- broadcast the bunch id every 15s
print(string.format("Broadcasting 'BUNCH=%s' every 10s",  BUNCH_ID))
tmr.create():alarm(10000, tmr.ALARM_AUTO, function()

  udpSocket:send(5053, wifi.sta.getbroadcast(), 'BUNCH=' .. BUNCH_ID)
  
end)

dofile("handlers.lua")
