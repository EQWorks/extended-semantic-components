import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import moment from 'moment-timezone'

import { DateRangePicker } from '../../src'
import { render } from '../utils'

import 'react-dates/initialize';

const defaultProps = {
  onSelection: action('Selected Date'),
}

storiesOf('DateRangePicker', module)
  .add('Default Date Picker', () => (
    render(
      <DateRangePicker {...defaultProps} />,
      'Bare minimum props needed to use a date picker',
    )
  ))
