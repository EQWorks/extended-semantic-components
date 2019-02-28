import 'semantic-ui-css/semantic.min.css'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { DateRangePicker } from '../src'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

const defaultProps = {
  onSelection: action('Selected Date'),
}

storiesOf('DateRangePicker', module)
  .add('Default Date Picker', () => (
    <DateRangePicker {...defaultProps} />
  )
)
