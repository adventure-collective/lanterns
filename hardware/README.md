## Bunches of lights

Each bunch of lights is driven by a nodeMCU esp8266 board connected to a string of lights/neopixels

The bunch is configured by modifying `config.lua` to include:

1. The wifi SSID & Password
2. The ID of the bunch
3. The number of LEDs

# API

Each bunch broadcasts it's ID so that listening devices can create an ID->IP Address map (see `discover.js` for details of how to do this).

Every 5 seconds, a bunch will broadcast in this format:

### `BUNCH={BUNCH_ID}`

A bunch will also start a UDP server - and can handle the following messages:

### `FILL {color}`

### `SET {color0}{color1}{color2}{color3}`


The format of `color` is a string of characters for each colour value

```js
// where (r, g, b) within [0, 255]
String.fromCharCode(r, g, b)
```


# Flashing nodeMCU firmware

(See [here](https://github.com/nodemcu/nodemcu-devkit/wiki/Getting-Started-on-OSX) or [here](https://nodemcu.readthedocs.io/en/master/en/flash/) for more in depth guides.)

1. downloaded/install [usb to uart drivers](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)

2. install esptool

```bash
git clone https://github.com/themadinventor/esptool.git
cd esptool
sudo python ./setup.py install
```

3. connect the esp8266 & put in flash mode

(hold down 'flash', then press 'reset' - the blue light will flash)

4. install firmware

```bash
python ./esptool.py --port=/dev/cu.SLAB_USBtoUART  write_flash  -fm=dio -fs=32m 0x00000 ../nodemcu-master-8-modules-2017-04-07-18-50-06-float.bin
```

# Writing code/config

1. downloaded/install [usb to uart drivers](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)

2. run [esplorer](https://esp8266.ru/esplorer/)

3. Select /dev/cu.SLAB_USBtoUART,  Set baud rate to 115200, Connect

3.5. Press RST on the nodemcu

4. Click Upload (you can also edit/save files)

5. Select all files in hardware
