const test = require('tape')
const tapSpec = require('tap-spec')
const Lanterns = require('./Lanterns')

test.createStream()
  .pipe(tapSpec())
  .pipe(process.stdout)


test('Raw access', t => {
  t.plan(1)

  const lanterns = new Lanterns({
    AA: [
      {x: 0, y: 0, z: 0},
      {x: 1, y: 1, z: 1}
    ],
    BB: [
      {x: 2, y: 2, z: 2},
      {x: 3, y: 3, z: 3}
    ]
  })

  const raw = lanterns.raw()

  t.deepEqual(raw, [
    {x: 0, y: 0, z: 0, $:['AA', 0]},
    {x: 1, y: 1, z: 1, $:['AA', 1]},
    {x: 2, y: 2, z: 2, $:['BB', 0]},
    {x: 3, y: 3, z: 3, $:['BB', 1]}
  ])

})


test('Count', t => {
  t.plan(1)

  const lanterns = new Lanterns({
    AA: [
      {x: 0, y: 0, z: 0},
      {x: 1, y: 1, z: 1, count: 2},
      {x: 2, y: 2, z: 2},
      {x: 3, y: 3, z: 3}
    ]
  })

  const raw = lanterns.raw()

  t.deepEqual(raw, [
    {x: 0, y: 0, z: 0, $:['AA', 0]},
    {x: 1, y: 1, z: 1, $:['AA', 1]},
    {x: 1, y: 1, z: 1, $:['AA', 2]},
    {x: 2, y: 2, z: 2, $:['AA', 3]},
    {x: 3, y: 3, z: 3, $:['AA', 4]}
  ])

})


test('Interpolation', t => {
  t.plan(1)

  const lanterns = new Lanterns({
    AA: [
      {x: 0, y: 0, z: 0},
      {},{},
      {x: 3, y: 3, z: 3}
    ]
  })

  const raw = lanterns.raw()

  t.deepEqual(raw, [
    {x: 0, y: 0, z: 0, $:['AA', 0]},
    {x: 1, y: 1, z: 1, $:['AA', 1]},
    {x: 2, y: 2, z: 2, $:['AA', 2]},
    {x: 3, y: 3, z: 3, $:['AA', 3]}
  ])

})
