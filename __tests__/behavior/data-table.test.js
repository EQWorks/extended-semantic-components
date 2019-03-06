import React from 'react'
import renderer from 'react-test-renderer'

import { DataTable } from '../../src'
import { monsters } from '../../stories/data'


test('DataTable should render', () => {
  const component = renderer.create(
    <DataTable data={monsters} />
  )

  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
