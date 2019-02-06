import 'semantic-ui-css/semantic.min.css'
import React from 'react'

import { storiesOf } from '@storybook/react'
import { Container } from 'semantic-ui-react'

import { DataTable } from '../src'
import { largeDataset } from './data.js'
/*
largeDataset = [
  { id: 2, first_name: 'Dorene', last_name: 'Faill', email: 'dfaill1@eepurl.com' },
  ...
]
*/

const monsters = [
  { name: 'Godzilla', origin: 'Earth' },
  { name: 'Ghidorah', origin: '???' },
  { name: 'Lugia', origin: 'Pokémon Universe' },
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
  .add('Custom Download Name', () => (
    <Container>
      <DataTable data={monsters} downloadName='monsters'>
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
  .add('Searchable Columns', () => (
    <Container>
      <DataTable data={monsters}>
        <DataTable.Column
          name='Name'
          dataKey='name'
          searchable
        />
        <DataTable.Column
          name='Origin'
          dataKey='origin'
          searchable
        />
      </DataTable>
    </Container>
  ))
  .add('Pickable Columns', () => (
    <Container>
      <DataTable data={monsters}>
        <DataTable.Column
          name='Name'
          dataKey='name'
          pickable
        />
        <DataTable.Column
          name='Origin'
          dataKey='origin'
          pickable
        />
      </DataTable>
    </Container>
  ))
  .add('Columns property', () => (
    <Container>
      <DataTable data={monsters} columns={[
        {
          name: 'Name',
          dataKey: 'name',
          pickable: true,
          searchable: true,
        },
        {
          name: 'Origin',
          dataKey: 'origin',
          pickable: true,
          searchable: true,
        },
      ]} />
    </Container>
  ))
  .add('Pagination', () => (
    <Container>
      <DataTable
        data={largeDataset}
        perPage={8}
        columns={[
          { name: 'ID', dataKey: 'id', searchable: true },
          { name: 'First Name', dataKey: 'first_name', searchable: true },
          { name: 'Last Name', dataKey: 'last_name', searchable: true },
          { name: 'Email', dataKey: 'email', searchable: true },
        ]}
      />
    </Container>
  ))
  .add('Row Click Listener', () => (
    <Container>
      <DataTable
        data={monsters}
        onRowClick={(e, d) => {
          alert(`Clicked: ${d.name}`)
        }}>
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
  .add('Active Rows', () => (
    <Container>
      <DataTable
        data={monsters}
        isRowActive={row => row.origin === 'Earth'}>
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
