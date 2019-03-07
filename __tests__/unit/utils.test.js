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
