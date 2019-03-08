import search from '../../src/utils/search'
import sort from '../../src/utils/sort'


test('Searches "abc" in name field of supplied array of objects', () => {
  expect(
    search(
      'abc', // search text
      // search target data array
      [
        {name: 'abcd', origin: 'alpha'},
        {name: 'bcde', origin: '9abcd'},
        {name: 'bcde', origin: 'alpha'},
      ],
      // searchable fields
      ['name', 'origin']
    )
  ).toEqual(
    [
      {name: 'abcd', origin: 'alpha'},
      {name: 'bcde', origin: '9abcd'},
    ]
  )
})

test('Basic sort', () => {
  expect(
    [1,4,2,0,9].sort(sort('basic', 'ascending'))
  ).toEqual(
    [ 0,1,2,4,9 ]
  )
  expect(
    [1,4,2,'test', 'shane', 0,9].sort(sort('basic', 'ascending'))
  ).toEqual(
    [ 'test', 'shane', 0,1,2,4,9 ]
  )
  expect(
    [1,4,2,0,9].sort(sort('basic', 'descending'))
  ).toEqual(
    [ 9,4,2,1,0 ]
  )
  expect(
    [1,4,2,0,9, 'test', 'shane'].sort(sort('basic', 'descending'))
  ).toEqual(
    [ 9,4,2,1,0, 'test', 'shane' ]
  )
})

test('String sort', () => {
  expect(
    ['Shane', 'Leo', 'Jason', 'Ianec', 'Ethena'].sort(sort('string', 'ascending'))
  ).toEqual(
    [ 'Ethena', 'Ianec', 'Jason', 'Leo', 'Shane' ]
  )
  expect(
    ['Shane', 'Leo', 'Jason', 'Ianec', 'Ethena', 0, null].sort(sort('string', 'ascending'))
  ).toEqual(
    [ null, 0, 'Ethena', 'Ianec', 'Jason', 'Leo', 'Shane' ]
  )
  expect(
    [ 'Shane', 'Jason', 'Ianec', 'Ethena', 'Leo'].sort(sort('string', 'descending'))
  ).toEqual(
    [ 'Shane', 'Leo', 'Jason', 'Ianec', 'Ethena' ]
  )
  expect(
    ['Shane', 'Jason', 'Ianec', 'Ethena', 'Leo', 0, null].sort(sort('string', 'descending'))
  ).toEqual(
    [ 'Shane', 'Leo', 'Jason', 'Ianec', 'Ethena', 0, null ]
  )
})

test('Date sort', () => {
  const now = new Date()
  const then = new Date('1954-11-03').toISOString()
  expect(
    ['1990-11-23', now, then].sort(sort('date', 'ascending'))
  ).toEqual(
    [ then, '1990-11-23', now]
  )
  expect(
    ['1990-11-23', now, then, null, ''].sort(sort('date', 'ascending'))
  ).toEqual(
    [ null, '', then, '1990-11-23', now ]
  )
  expect(
    [ '1990-11-23', now, then ].sort(sort('date', 'descending'))
  ).toEqual(
    [ now, '1990-11-23', then ]
  )
  expect(
    [ null, '1990-11-23', now, then, '' ].sort(sort('date', 'descending'))
  ).toEqual(
    [ now, '1990-11-23', then, null, '' ]
  )
})
