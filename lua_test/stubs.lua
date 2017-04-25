ws2812 = {}
buffer = {}

ws2812.init = function()
  -- print "[stub] ws2812:init"
end

ws2812.newBuffer = function()
  -- print "[stub] ws2812:newBuffer"
  return buffer
end

ws2812.write = function()
  -- print "[stub] ws2812:write"
  return buffer
end

buffer.fill = function(_buff,r,g,b)
  -- print (string.format("buffer:fill %d, %d, %d", r, g, b))
end
