import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import 'semantic-ui-css/semantic.min.css'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { DateRangePicker } from '../src'

storiesOf('DateRangePicker', module)
  .add('Default', () => (
    <DateRangePicker onSelection={action('Selected Date Range')} />
  ))
