-- run from from main directory `lua lua_test/test.lua`
dofile('lua_test/minctest.lua')
dofile('lua/handlers.lua')


lrun("basic hex", function()

  local r,g,b = hextorgb('123456')
  lequal(r, 18)
  lequal(g, 52)
  lequal(b, 86)

  local r,g,b = hextorgb('ffffff')
  lequal(r, 255)
  lequal(g, 255)
  lequal(b, 255)

  local r,g,b = hextorgb('000000')
  lequal(r, 0)
  lequal(g, 0)
  lequal(b, 0)

end)



return lresults()
