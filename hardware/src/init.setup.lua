print 'Entering setup mode'

dofile("config.lua")

CHIP_ID = string.format('%X', node.chipid())

cfg={}
cfg.ssid="bunch-setup-" .. CHIP_ID
cfg.pwd="password"

wifi.setmode(wifi.SOFTAP, false)
wifi.ap.config(cfg)

tmr.create():alarm(1000, tmr.ALARM_AUTO, function(cb_timer)
    if wifi.ap.getip() == nil then
        print("Connecting")
    else
        cb_timer:unregister()
        print("Connected, IP address: " .. wifi.ap.getip())
    end
end)



-- wifi.setmode(wifi.STATION)
-- wifi.sta.config('DEBUG', 'CREDENTIALS')
-- tmr.create():alarm(1000, tmr.ALARM_AUTO, function(cb_timer)
--     if wifi.sta.getip() == nil then
--         print("Connecting")
--     else
--         cb_timer:unregister()
--         print("Connected, IP address: " .. wifi.sta.getip())
--     end
-- end)


SITE_FLASH = ''

-- a simple HTTP server
srv = net.createServer(net.TCP)
srv:listen(80, function(conn)
    conn:on("receive", function(sck, payload)
      SITE_FLASH = ''

      print("PAYLOAD:" .. payload)

      if (payload:sub(0,4) == 'POST') then

        local body = payload:match('[^%c]*$')

        print("Post body: ".. body)

        parts = {}
        body:gsub('&?(.-)=([^&]*)', function(key, value)
          parts[key] = value
        end)

        config_str = template(config)

        print("WRITING" .. template(config))

        if file.open("config.lua", "w") then
          file.write(config_str)
          file.close()
        end

        SITE_FLASH = 'SAVED'

        -- reload config
        dofile("config.lua")

      end


      -- and send response with variables filled
      sck:send(template(html))
    end)
    conn:on("sent", function(sck) sck:close() end)
end)
port, ip = srv:getaddr()
print(string.format("local HTTP server / port: %s:%d", ip, port))


-- dumb dumb dumb "templating"
function template(str)
  return str:gsub("(${.-})", function(a)
    return loadstring("return " .. a:sub(3, -2))()
  end)
end

html = [[HTTP/1.0 200 OK
Content-Type: text/html

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>config</title>
    <style media="screen">
      body {font-family: AvenirNext-bold, Arial, sans-serif;color:#222;background:#eee; background: #a3c4ff linear-gradient(135deg, #e2ffc1 0%,#a3c4ff 100%); min-height: 100vh}
      label {display: flex;}
      span, input {flex: 1; margin: .5em;}
      span {flex: .5; text-align: right;}
      form {max-width: 30em; margin: 0 auto; padding: 5em 0}
      header {text-align: right;margin:.5em;font-size: 1.5em; position: fixed; transition: .3s;opacity: 1; color: #000}
      [type=submit] {float:right}
      input { background: rgba(255,255,255,0.4); border: none; padding: .5em; box-shadow: rgba(119, 119, 119, 0.17) 2px 2px 4px; }
    </style>
  </head>
  <body>
    <header>${SITE_FLASH}<script>setTimeout(n=>n.style.opacity=0,1500,document.currentScript.parentNode)</script></header>
    <form method="post">
      <h1>${CHIP_ID}</h1>
      <label><span>ssid</span><input name="SSID" value="${SSID}" required></label>
      <label><span>password</span><input name="PASSWORD" value="${PASSWORD}" pattern=".{0}|.{8,64}" required title="Either 0 OR (8 to 64 chars)"></label>
      <label><span>bunch id</span><input name="BUNCH_ID" value="${BUNCH_ID}" required></label>
      <label><span>led count</span><input name="NUM_PIXELS" value="${NUM_PIXELS}" type="number" required min="0" max="200"></label>
      <input type="submit" value="save">
    </form>
  </body>
</html>]]


config = [[
-- Settings generated by setup:

SSID = "${parts.SSID}"
PASSWORD = "${parts.PASSWORD}"

BUNCH_ID = "${parts.BUNCH_ID}"
NUM_PIXELS = ${parts.NUM_PIXELS}
]]
