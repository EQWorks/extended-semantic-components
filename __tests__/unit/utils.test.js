import search from '../../src/utils/search'


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

test('Searches normal character in field of supplied array included diacritics of objects', () => {
  expect(
    search(
      'jorg', // search text
      // search target data array
      [
        {name: 'Jörg', partner: 'Jürgen'},
        {name: 'Jürgen', partner: 'Jörg'},
        {name: 'Günter', partner: 'Erna'},
      ],
      // searchable fields
      ['name', 'partner']
    )
  ).toEqual(
    [
      {name: 'Jörg', partner: 'Jürgen'},
      {name: 'Jürgen', partner: 'Jörg'},
    ]
  )
})

test('Searches number in field of supplied array included number of objects', () => {
  expect(
    search(
      '890', // search text
      // search target data array
      [
        { name: 'Athena', origin: 'Earth', cell: '647-234-8908'},
        { name: 'Bob', origin: '???', cell: '647-134-8908'},
        { name: 'Celia', origin: 'Pokémon Universe', cell: '647-890-8777'},
        { name: 'David', origin: 'Earth', cell: '647-233-3333'},
      ],
      // searchable fields
      ['name', 'origin', 'cell']
    )
  ).toEqual(
    [
      { name: 'Athena', origin: 'Earth', cell: '647-234-8908'},
      { name: 'Bob', origin: '???', cell: '647-134-8908'},
      { name: 'Celia', origin: 'Pokémon Universe', cell: '647-890-8777'},
    ]
  )
})
