const test = require('tape')
const Lanterns = require('./Lanterns')


test('This is a test', t => {
  t.plan(1)
  t.assert(true)
})


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

  // t.assertEqual(raw.length === 4)
  // t.assertEqual(raw[3].x === 3)

  t.deepEqual(raw, [
    {x: 0, y: 0, z: 0},
    {x: 1, y: 1, z: 1},
    {x: 2, y: 2, z: 2},
    {x: 3, y: 3, z: 3}
  ])

})
