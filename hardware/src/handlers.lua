-- I guess this creates a new buffer each time handlers are evaluated
ws2812.init()
local buffer = ws2812.newBuffer(NUM_PIXELS, 3)

function handle_http(sck, payload)
  print(payload)
  sck:send("HTTP/1.0 200 OK\r\nContent-Type: text/html\r\n\r\n<h1>Hello from nodeMCU</h1>")
end

function handle_udp(sck, data, ip, port)

  if(data:sub(0,4) == 'SET ') then
    buffer:set(1, data:sub(5))
    ws2812.write(buffer)
    return
  end

  if(data:sub(0,5) == 'FILL ') then
    local r,g,b = data:byte(6,9)
    buffer:fill(r,g,b)
    ws2812.write(buffer)
    return
  end

end
