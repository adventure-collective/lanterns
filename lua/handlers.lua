if(ws2812 ~= nil) then
  print("init ws2812")
  ws2812.init()
  local buffer = ws2812.newBuffer(16, 3)
end

function handle_http(sck, payload)
  print(payload)
  sck:send("HTTP/1.0 200 OK\r\nContent-Type: text/html\r\n\r\n<h1>Hello from nodeMCU</h1>")
end

function hextorgb(hex_str)
  return tonumber("0x"..hex_str:sub(1,2)) or 0,
         tonumber("0x"..hex_str:sub(3,4)) or 0,
         tonumber("0x"..hex_str:sub(5,6)) or 0
end

function handle_udp(sck, data)

  print(string.format("received '%s' from %s:%d", data, ip, port))

  local i = 0
  for tok in data:gmatch("%w+") do
    -- todo check first token

    if(i == 1) then
      local r,g,b = hextorgb(tok)
      buffer:fill(r, g, b)
      ws2812.write(buffer)
    end

    i = i + 1
  end

end


-- handle_udp(nil, "FILL ffcc00")
