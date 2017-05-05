# lanterns

Requirements:

* have a few bunches of lights on your network (see `./hardware` for info)
* node / yarn installed

```bash
# install dependencies
yarn install

# create an id->ip address map (saved as network.json)
# leave this running until you've got all your bunches then ctrl-c to exit
npm run discover


# Start the ui server
npm run

# open http://localhost:3000 in your browser
```
