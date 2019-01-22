import 'semantic-ui-css/semantic.min.css'
import 'react-dates/initialize'
import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { DateRangePicker } from '../src'


const monsters = [
  { name: 'Godzilla' },
  { name: 'Ghidorah' },
  { name: 'Lugia' },
]

storiesOf('DateRangePicker', module)
  .add('Minimal/Default', () => (
    <DateRangePicker onSelection={action} />
  ))
