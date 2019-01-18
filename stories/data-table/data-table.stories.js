import React from 'react'
import { storiesOf } from '@storybook/react'

import { DataTable } from '../../src'
import { render } from '../utils'


const monsters = [
  {
    id: 1,
    name: 'Godzilla',
  },
  {
    id: 2,
    name: 'Ghidorah',
  },
  {
    id: 3,
    name: 'Mecha Godzilla',
  },
]


storiesOf('DataTable', module)
  .add('Minimum DataTable', () => (
    render(
      <DataTable data={monsters}>
        <DataTable.Column
          name='ID'
          dataKey='id'
        />
        <DataTable.Column
          name='Name'
          dataKey='name'
        />
      </DataTable>,
      `Minimum DataTable usage with sample data ${JSON.stringify(monsters)}`,
    )
  ))
