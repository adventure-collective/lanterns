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


## Layout json format

The layout of several bunches of lights are defined in a layout json file.

For two sets of lights that are running alongside each other one in front of, and one behind, the layout file file might look something this:

```json
{
  "BUNCH_ID_ONE": [
    {"x": 1, "y": 1, "z": 1},
    {"x": 2, "y": 1, "z": 1},
    {"x": 3, "y": 1, "z": 1},
    {"x": 4, "y": 1, "z": 1},
    {"x": 5, "y": 1, "z": 1}
  ],
  "BUNCH_ID_TWO": [
    {"x": 1, "y": 1, "z": -1},
    {"x": 2, "y": 1, "z": -1},
    {"x": 3, "y": 1, "z": -1},
    {"x": 4, "y": 1, "z": -1},
    {"x": 5, "y": 1, "z": -1}
  ]
}
```

There are some shortcuts that can be used:

#### grouping multiple lights

Multiple lights (eg, ones in the same lantern) can be duplicated with the `count` property

```js
[
  { x: 0, y: 0, z: 0},
  { x: 1, y: 1, z: 1, count: 3},
  { x: 2, y: 2, z: 2}
]

// is equivalent to
[
  { x: 0, y: 0, z: 0},
  { x: 1, y: 1, z: 1},
  { x: 1, y: 1, z: 1},
  { x: 1, y: 1, z: 1},
  { x: 2, y: 2, z: 2}
]
```

### interpolating positions

If the x,y,z properties are omitted, they will be interpolated between other points.

```js
[
  { x: 0, y: 0, z: 0},
  { },{ },{ },
  { x: 4, y: 4, z: 4}
]

// is equivalent to
[
  { x: 0, y: 0, z: 0},
  { x: 1, y: 1, z: 1},
  { x: 2, y: 2, z: 2},
  { x: 3, y: 3, z: 3},
  { x: 4, y: 4, z: 4}
]
```

This can be combined with `count` for making it easier to enter long/straight lines of lights


## Setting up a bunch of lights

(assuming firmware flashed and files uploaded)

1. Connect pins D0 + D1
2. Power on
3. Connect to wifi hotspot 'bunch-setup-XYZAB'
4. Visit http://192.168.4.1
5. Us the UI to configure the lights
6. Power off
7. Disconnect pins D0 + D1
8. Power on
