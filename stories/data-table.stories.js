import 'semantic-ui-css/semantic.min.css'
import React from 'react'

import { storiesOf } from '@storybook/react'
import { Container } from 'semantic-ui-react'

import { DataTable } from '../src'


const monsters = [
  { name: 'Godzilla', origin: 'Earth' },
  { name: 'Ghidorah', origin: '???' },
  { name: 'Lugia', origin: 'Pokémon' },
]

storiesOf('DataTable', module)
  .add('Minimal/Default', () => (
    <Container>
      <DataTable data={monsters}>
        <DataTable.Column
          name='Name'
          dataKey='name'
        />
        <DataTable.Column
          name='Origin'
          dataKey='origin'
        />
      </DataTable>
    </Container>
  ))
