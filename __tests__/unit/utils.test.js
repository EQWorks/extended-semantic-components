import search from '../../src/utils/search'

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
