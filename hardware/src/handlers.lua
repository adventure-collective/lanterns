-- I guess this creates a new buffer each time handlers are evaluated
ws2812.init()
local buffer = ws2812.newBuffer(100, 3)

function handle_http(sck, payload)
  print(payload)
  sck:send("HTTP/1.0 200 OK\r\nContent-Type: text/html\r\n\r\n<h1>Hello from nodeMCU</h1>")
end

function hextorgb(hex)
  return tonumber(hex:sub(1,2), 16) or 0,
         tonumber(hex:sub(3,4), 16) or 0,
         tonumber(hex:sub(5,6), 16) or 0
end

function handle_udp(sck, data, ip, port)


  if(data:sub(0,4) == 'SET ') then
    buffer:set(1, data:sub(5))
    ws2812.write(buffer)
    return
  end

  local mode = nil

  local i = 0
  for tok in data:gmatch("%w+") do

    if(i == 0) then
      if(tok == 'FILL') then
        mode = 'FILL'
      end

      if(tok == 'SET') then
        mode = 'SET'
      end
    end

    if(i > 0) then
      if(mode == 'FILL') then
        local r,g,b = hextorgb(tok)
        buffer:fill(r, g, b)
      end

      if(mode == 'SET') then
        buffer:set(i, tok)
      end

    end

    i = i + 1
  end

  ws2812.write(buffer)

end


-- handle_udp(nil, "FILL ffcc00")
