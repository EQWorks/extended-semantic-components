import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import moment from 'moment-timezone'

import SemanticDatePicker from '../../components/semantic-date-picker'
import { render } from '../utils'


const defaultProps = {
  onSelection: action('Selected Date'),
  position: 'bottom left',
}

storiesOf('SemanticDatePicker', module)
  .add('Default Date Picker', () => (
    render(
      <SemanticDatePicker {...defaultProps} />,
      'Bare minimum props needed to use a date picker',
    )
  ))
  .add('Fire function on date selection', () => (
    render(
      <SemanticDatePicker
        {...defaultProps}
        onSelection={({ startDate, endDate }) => { action('Custom Function')(startDate, endDate) }}
      />,
      'On date selection, runs a function with argument of object { startDate, endDate }',
    )
  ))
  .add('End Date Only', () => (
    render(
      <SemanticDatePicker {...defaultProps} endDateOnly startDate={moment()} />,
      'Can restrict the date picker to only allow changes to the end date',
    )
  ))
  .add('Blocked Dates', () => {
    const blockedStart = moment()
    const blockedEnd = moment().add(7, 'd')

    return render(
      <SemanticDatePicker
        {...defaultProps}
        blockedStart={blockedStart}
        blockedEnd={blockedEnd}
      />,
      'Can restrict the date picker to only allow dates within a certain range',
    )
  })
  .add('Number of Months', () => (
    render(
      <SemanticDatePicker {...defaultProps} numberOfMonths={2} />,
      'Can change number of months shown',
    )
  ))
  .add('Keep open on date selection', () => (
    render(
      <SemanticDatePicker {...defaultProps} keepOpenOnSelection />,
      'Keeps date picker open after selecting dates',
    )
  ))
  .add('Calendar popup position', () => (
    render(
      <div style={{ padding: '200px 200px' }}>
        <SemanticDatePicker {...defaultProps} position='top center' />
      </div>,
      'Can specify the position of the calendar popup based on semantic ui popup position prop',
    )
  ))
  .add('Customize Label', () => (
    render(
      <SemanticDatePicker {...defaultProps} labelProps={{ icon: 'eye' }} />,
      `Can customize the label that shows the date according to the semantic-ui label docs, not all
      label props will work however`,
    )
  ))
