import 'semantic-ui-css/semantic.min.css'
import React from 'react'

import { storiesOf } from '@storybook/react'
import { Container } from 'semantic-ui-react'

import { DataTable } from '../src'


const monsters = [
  { name: 'Godzilla', origin: 'Earth', dob: new Date().toString(), fearsomeness: 1000 },
  { name: 'Ghidorah', origin: '???', dob: '2008-08-08', fearsomeness: 800 },
  { name: 'Lugia', origin: 'Pokémon Universe', dob: '1990-11-23', fearsomeness: 1001 },
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
  .add('Sortable Columns', () => (
    <Container>
      <DataTable data={monsters}>
        <DataTable.Column
          name='Name'
          dataKey='name'
          sortable
          sortType='string'
        />
        <DataTable.Column
          name='Origin'
          dataKey='origin'
          sortable
          sortType='string'
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
  .add('Default sort direction', () => (
    <Container>
      <DataTable
        data={monsters}
        defaultSortKey={'name'}
        defaultSortDir={'descending'}
        columns={[
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
        ]}
      />
    </Container>
  ))
  .add('Custom sorting', () => (
    <Container>
      <DataTable
        data={monsters}
        defaultSortKey={'name'}
        defaultSortDir={'descending'}
        columns={[
          {
            name: 'Name',
            dataKey: 'name',
            pickable: true,
            searchable: true,
            sortable: true,
            sortType: 'string',
          },
          {
            name: 'Origin',
            dataKey: 'origin',
            pickable: true,
            searchable: true,
            sortable: true,
            sortType: 'string',
          },
          {
            name: 'Fearsomeness',
            dataKey: 'fearsomeness',
            pickable: true,
            searchable: true,
            sortable: true,
            sortType: 'basic',
          },
          {
            name: 'Date of Birth',
            dataKey: 'dob',
            pickable: true,
            searchable: true,
            sortable: true,
            sortType: 'date',
          },
        ]}
      />
    </Container>
  ))
