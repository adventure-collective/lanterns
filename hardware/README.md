# Flashing nodeMCU firmware

1. downloaded/install [usb to uart drivers](https://www.silabs.com/products/development-tools/software/usb-to-uart-bridge-vcp-drivers)

2. install esptool

```bash
git clone https://github.com/themadinventor/esptool.git
cd esptool
sudo python ./setup.py install
```

3. connect the esp8266 & put in flash mode

(hold down 'flash', then press 'reset')

4. install firmware

```bash
python ./esptool.py --port=/dev/cu.SLAB_USBtoUART  write_flash  -fm=dio -fs=32m 0x00000 ../nodemcu-master-8-modules-2017-04-07-18-50-06-float.bin
```
