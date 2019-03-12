import search from '../../src/utils/search'
import { sort } from '../../src/utils/sort'

const matrix = [
  { text: 'abc',
    data: [
      {name: 'abcd', origin: 'alpha'},
      {name: 'bcde', origin: '9abcd'},
      {name: 'bcde', origin: 'alpha'},
    ],
    searchable: ['name', 'origin'],
    output: [
      {name: 'abcd', origin: 'alpha'},
      {name: 'bcde', origin: '9abcd'},
    ]
  },
  { text: 'jorg',
    data: [
      {name: 'Jörg', partner: 'Jürgen'},
      {name: 'Jürgen', partner: 'Jörg'},
      {name: 'Günter', partner: 'Erna'},
    ],
    searchable: ['name', 'partner'],
    output: [
      {name: 'Jörg', partner: 'Jürgen'},
      {name: 'Jürgen', partner: 'Jörg'},
    ]
  },
  { text: '890',
    data: [
      { name: 'Athena', origin: 'Earth', cell: '647-234-8908'},
      { name: 'Bob', origin: '???', cell: '647-134-8908'},
      { name: 'Celia', origin: 'Pokémon Universe', cell: '647-890-8777'},
      { name: 'David', origin: 'Earth', cell: '647-233-3333'},
    ],
    searchable: ['name', 'origin', 'cell'],
    output: [
      { name: 'Athena', origin: 'Earth', cell: '647-234-8908'},
      { name: 'Bob', origin: '???', cell: '647-134-8908'},
      { name: 'Celia', origin: 'Pokémon Universe', cell: '647-890-8777'},
    ]
  },
  { text: 'america south',
    data: [
      { name: 'Athena', origin: 'North America', cell: '647-234-8908'},
      { name: 'Bob', origin: 'North America', cell: '647-134-8908'},
      { name: 'Celia', origin: 'North America', cell: '647-890-8777'},
      { name: 'David', origin: 'South America', cell: '647-233-3333'},
    ],
    searchable: ['name', 'origin', 'cell'],
    output: [
      { name: 'David', origin: 'South America', cell: '647-233-3333'},
    ]
  },
  { text: 'south dddd',
    data: [
      { name: 'Athena', origin: 'North America', cell: '647-234-8908'},
      { name: 'Bob', origin: 'North America', cell: '647-134-8908'},
      { name: 'Celia', origin: 'North America', cell: '647-890-8777'},
      { name: 'David', origin: 'South America', cell: '647-233-3333'},
    ],
    searchable: ['name', 'origin', 'cell'],
    output: [
      { name: 'David', origin: 'South America', cell: '647-233-3333'},
    ]
  },
  { text: 'dddd america',
    data: [
      { name: 'Athena', origin: 'North America', cell: '647-234-8908'},
      { name: 'Bob', origin: 'North America', cell: '647-134-8908'},
      { name: 'Celia', origin: 'North America', cell: '647-890-8777'},
      { name: 'David', origin: 'South America', cell: '647-233-3333'},
    ],
    searchable: ['name', 'origin', 'cell'],
    output: [
      { name: 'Athena', origin: 'North America', cell: '647-234-8908'},
      { name: 'Bob', origin: 'North America', cell: '647-134-8908'},
      { name: 'Celia', origin: 'North America', cell: '647-890-8777'},
      { name: 'David', origin: 'South America', cell: '647-233-3333'},
    ]
  },
  { text: '?',
    data: [
      { name: 'Athena', origin: 'North America', cell: '647-234-8908'},
      { name: 'Bob', origin: 'North America', cell: '647-134-8908'},
      { name: 'Celia', origin: 'North America', cell: '647-890-8777'},
      { name: 'David', origin: 'South America', cell: '647-233-3333'},
    ],
    searchable: ['name', 'origin', 'cell'],
    output: []
  },
  { text: '                ',
    data: [
      { name: 'Athena', origin: 'North America', cell: '647-234-8908'},
      { name: 'Bob', origin: 'North America', cell: '647-134-8908'},
      { name: 'Celia', origin: 'North America', cell: '647-890-8777'},
      { name: 'David', origin: 'South America', cell: '647-233-3333'},
    ],
    searchable: ['name', 'origin', 'cell'],
    output: [
      { name: 'Athena', origin: 'North America', cell: '647-234-8908'},
      { name: 'Bob', origin: 'North America', cell: '647-134-8908'},
      { name: 'Celia', origin: 'North America', cell: '647-890-8777'},
      { name: 'David', origin: 'South America', cell: '647-233-3333'},
    ]
  },
  { text: 'ath                ena',
    data: [
      { name: 'Athena', origin: 'North America', cell: '647-234-8908'},
      { name: 'Bob', origin: 'North America', cell: '647-134-8908'},
      { name: 'Celia', origin: 'North America', cell: '647-890-8777'},
      { name: 'David', origin: 'South America', cell: '647-233-3333'},
    ],
    searchable: ['name', 'origin', 'cell'],
    output: [
      { name: 'Athena', origin: 'North America', cell: '647-234-8908'},
    ]
  },
]

test('input various strings in filed of supplied array of objects', () => {
  matrix.forEach(({ text, data, searchable, output }) => {
    expect( search( text, data, searchable ) ).toEqual( output )
  })
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
