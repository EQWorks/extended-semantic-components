import 'semantic-ui-css/semantic.min.css'
import React from 'react'

import { storiesOf } from '@storybook/react'
import { Container, Button, List } from 'semantic-ui-react'

import { DataTable } from '../src'
import { largeDataset, monsters, cohort } from './data.js'
import Fuse from 'fuse.js'
/*
largeDataset = [
  { id: 2, first_name: 'Dorene', last_name: 'Faill', email: 'dfaill1@eepurl.com' },
  ...
]
*/


storiesOf('DataTable', module)
  .addParameters({
    info: {
      inline: true,
      header: false,
    },
  })
  .add('Default', () => (
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
  .add('Minimal', () => (
    <Container>
      <DataTable data={monsters} download={false}>
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
  .add('Zero config table', () => (
    <Container>
      <DataTable data={monsters} />
    </Container>
  ))
  .add('Empty Data', () => (
    <Container>
      <DataTable data={[]} download={false} >
        <DataTable.Column name='Name' dataKey='name' />
        <DataTable.Column name='Origin' dataKey='origin' />
      </DataTable>
    </Container>
  ))
  .add('Empty Data - zero config', () => (
    <Container>
      <DataTable
        data={[]}
      />
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
  .add('Default sort key and order', () => (
    <Container>
      <DataTable
        defaultSortKey='name'
        defaultSortDir='ascending'
        data={monsters}
        columns={[
          {
            name: 'Name',
            dataKey: 'name',
          },
          {
            name: 'Origin',
            dataKey: 'origin',
          },
        ]} />
    </Container>
  ))
  .add('Custom sorting', () => (
    <Container>
      <DataTable
        data={monsters}
        defaultSortKey='name'
        defaultSortDir='descending'
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
  .add('Download picked columns', () => (
    <Container>
      <DataTable data={monsters} downloadPicked={true}>
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
  .add('Custom column rendering', () => (
    <Container>
      <DataTable data={monsters}>
        <DataTable.Column
          name='Name'
          dataKey='name'
          template={(value, row, dataKey) => (
            <Button
              content={value}
              onClick={() => alert(`${dataKey}: ${value}, Birth: ${row.dob}`)}
            />
          )}
        />
        <DataTable.Column name='Origin' dataKey='origin' />
        <DataTable.Column name='Date of Birth' dataKey='dob' />
      </DataTable>
    </Container>
  ))
  .add('Custom search table', () => (
    <Container>
      <DataTable data={monsters} search={(text, data, searchables) => {
        const options = {
          shouldSort: true,
          tokenize: true,
          keys: searchables,
        }
        const fuse = new Fuse(data, options)
        return fuse.search(text)
      }} />
    </Container>
  ))
  .add('Basic Style', () => (
    <Container>
      <DataTable
        data={cohort}
        download={false}
        cellStyles={
          {
            '-1': {
              className: 'cell',
              style: { fontWeight: 800 },
              warning: true,
              condition: ({ value }) => value > 5,
            },
            '3-4': {
              style: { fontWeight: 800 },
            }
          }
        }
        rowStyles={{
          '-1': {
            active: true,
            condition: ({ rowIdx }) => rowIdx % 2 === 0
          },
          '1': { error: true }
        }}
        colStyles={{ '3': { positive: true }}}
      >
        <DataTable.Column
          name='Period'
          dataKey='period'
          template={value => (
            <List.Item
              header={value.header}
              description={value.subheader}
            />
          )}
        />
        <DataTable.Column
          name='Week 0'
          dataKey='week0'
          template={value => `${value} %`}
          icon='attention'
        />
        {[1,2,3].map(num => (
          <DataTable.Column
            key={num}
            name={`Week ${num}`}
            dataKey={`week${num}`}
            template={value => `${value} %`}
          />
        ))}
      </DataTable>
    </Container>
  ))
  .add('Dynamic Style', () => (
    <Container>
      <DataTable
        data={cohort}
        download={false}
        rowStyles={{
          '-1': {
            dynamic: ({ value, rowIdx }) => {
              const style = {}
              if (rowIdx % 2 === 0) {
                style.active = true
              }
              if (value > 3) {
                style.style = { fontWeight: 800 }
              }
              return style
            },
          }
        }}
      >
        <DataTable.Column
          name='Period'
          dataKey='period'
          template={value => (
            <List.Item
              header={value.header}
              description={value.subheader}
            />
          )}
        />
        <DataTable.Column
          name='Week 0'
          dataKey='week0'
          template={value => value ? `${value} %` : '-'}
        />
        {[1,2,3].map(num => (
          <DataTable.Column
            key={num}
            name={`Week ${num}`}
            dataKey={`week${num}`}
            template={value => value ? `${value} %` : '-'}
          />
        ))}
      </DataTable>
    </Container>
  ))
