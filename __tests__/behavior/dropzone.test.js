import React from 'react'
import renderer from 'react-test-renderer'

import { Dropzone } from '../../src'


test('Dropzone should render', () => {
  const component = renderer.create(
    <Dropzone onDrop={() => {}} />
  )

  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('Dropzone with custom message for CSV', () => {
  const component = renderer.create(
    <Dropzone
      onDrop={() => {}}
      accept='.csv, text/csv, application/vnd.ms-excel'
      defaultMsg='Drop your file here'
      activeMsg='I see you are trying to drop something'
      rejectMsg='Invalid file type'
      note='Only CSV files are allowed'
    />
  )

  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
