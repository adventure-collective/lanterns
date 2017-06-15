print("CHIP_ID" .. string.format('%X', node.chipid()))

-- Check if pins 0 & 1 are shorted, if so enter setup mode

gpio.mode(0, gpio.OUTPUT)
gpio.mode(1, gpio.INPUT)

gpio.write(0, gpio.HIGH)
local high = gpio.read(1)

gpio.write(0, gpio.LOW)
local low = gpio.read(1)

gpio.mode(0, gpio.INPUT)

local initFile = 'init.normal.lua'

if (high == 1 and low == 0) then
  print 'D0 & D1 connected - SETUP mode'
  initFile = 'init.setup.lua'
end

function startup()
   if file.open("init.lua") == nil then
      print("init.lua deleted or renamed")
   else
      print("Running")
      file.close("init.lua")
      dofile(initFile)
   end
end

print("loading " .. initFile .. " in 3 seconds")
tmr.create():alarm(3000, tmr.ALARM_SINGLE, startup)
