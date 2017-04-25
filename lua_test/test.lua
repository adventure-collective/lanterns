-- requires busted
-- busted lua_test/test.lua

dofile('lua/handlers.lua')

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
