-- requires busted
-- busted lua_test/test.lua

dofile('test/stubs.lua')
dofile('src/handlers.lua')

describe("hex to rbg", function()

  it("should handle basic hex", function()

    local r,g,b = hextorgb('123456')
    assert.are.same(r, 18)
    assert.are.same(g, 52)
    assert.are.same(b, 86)

    local r,g,b = hextorgb('ffffff')
    assert.are.same(r, 255)
    assert.are.same(g, 255)
    assert.are.same(b, 255)

    local r,g,b = hextorgb('000000')
    assert.are.same(r, 0)
    assert.are.same(g, 0)
    assert.are.same(b, 0)

  end)


  it("should handle different hex", function()

    local r,g,b = hextorgb('12345612345')
    assert.are.same(r, 18)
    assert.are.same(g, 52)
    assert.are.same(b, 86)

    -- not sure about values here, but mainly, it shouldn't crash
    local r,g,b = hextorgb('this is not a hex')
    assert.are.same(r, 0)
    assert.are.same(g, 0)
    assert.are.same(b, 0)

    -- or here
    local r,g,b = hextorgb('0')
    assert.are.same(r, 0)
    assert.are.same(g, 0)
    assert.are.same(b, 0)

  end)

end)


describe("message handling", function()

  it("should handle FILL messages", function()
    spy.on(buffer, "fill")

    handle_udp(nil, "FILL ff00cc", '', 0)
    assert.spy(buffer.fill).was_called_with(buffer,255,0,204)

    handle_udp(nil, "FILL 000000", '', 0)
    assert.spy(buffer.fill).was_called_with(buffer,0,0,0)
  end)


  it("should handle SET messages", function()
    spy.on(buffer, "set")

    local data = string.char(255,255,255, 0,0,0, 255,255,255, 204,204,204)

    handle_udp(nil, "SET " .. data, '', 0)
    assert.spy(buffer.set).was_called_with(buffer,1,data)

  end)

end)
