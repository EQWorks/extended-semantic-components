import React from 'react'
import PropTypes from 'prop-types'

import { Input, Select, Label } from 'semantic-ui-react'

import Style from './dropdown-input.css'


const propTypes = {
  label: PropTypes.object.isRequired,
  select: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

const DropdownInput = ({ label, select, input, onChange }) => (
  <Input
    type='text'
    labelPosition='right'
    onChange={onChange}
  >
    <Select
      {...select}
      className={Style.customDropdown}
    />
    <input
      {...input}
      className={Style.customInput}
    />
    <Label
      {...label}
    />
  </Input>
)

DropdownInput.propTypes = propTypes

export default DropdownInput
