-- requires busted
-- busted lua_test/test.lua

dofile('test/stubs.lua')
dofile('src/handlers.lua')

describe("message handling", function()

  it("should handle FILL messages", function()
    spy.on(buffer, "fill")

    handle_udp(nil, "FILL " .. string.char(255,0,204), '', 0)
    assert.spy(buffer.fill).was_called_with(buffer,255,0,204)

    handle_udp(nil, "FILL " .. string.char(0,0,0), '', 0)
    assert.spy(buffer.fill).was_called_with(buffer,0,0,0)
  end)


  it("should handle SET messages", function()
    spy.on(buffer, "set")

    local data = string.char(255,255,255, 0,0,0, 255,255,255, 204,204,204)

    handle_udp(nil, "SET " .. data, '', 0)
    assert.spy(buffer.set).was_called_with(buffer,1,data)

  end)

end)
