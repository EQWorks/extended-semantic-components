import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { without, isEmpty } from 'lodash'
import { Dropdown } from 'semantic-ui-react'


const propTypes = { onChange: PropTypes.func }

const defaultProps = { onChange: () => {} }

class SingleSelectDropdown extends Component {
  state = { value: [] }

  onChange = (e, { value }) => {
    if (isEmpty(value)) {
      this.setState({ value: [] })
      this.props.onChange(e, { value: null })
    } else {
      const newValue = without(value, this.state.value[0])

      this.setState({ value: newValue })
      this.props.onChange(e, { value: newValue[0] })
    }
  }

  render() {
    return (
      <Dropdown
        {...this.props}
        value={this.state.value}
        multiple
        selection
        onChange={this.onChange}
      />
    )
  }
}

SingleSelectDropdown.propTypes = propTypes

SingleSelectDropdown.defaultProps = defaultProps

export default SingleSelectDropdown
