import React, { Component } from 'react'

import PropTypes from 'prop-types'
import { Table, Popup } from 'semantic-ui-react'

import styles from './table-overflow-cell.css'


const propTypes = {
  table: PropTypes.object.isRequired,
  content: PropTypes.string,
  trigger: PropTypes.node.isRequired,
}

const defaultProps = { content: '' }

class TableOverflowCell extends Component {
  state = { displayPopup: false }

  onMouseOver = () => {
    if (this.cell.scrollWidth - this.cell.clientWidth) {
      this.setState({ displayPopup: true })
    }
  }

  onMouseLeave = () => {
    this.setState({ displayPopup: false })
  }

  // hacky way to display the Popup since open prop of Popup is currently bugged
  renderCell = () => {
    const { displayPopup } = this.state
    const { trigger, content } = this.props

    if (displayPopup) {
      return (
        <Popup
          inverted
          position='top left'
          trigger={trigger}
          on='hover'
          content={content}
        />
      )
    }

    return trigger
  }

  render() {
    return (
      <Table.Cell
        {...this.props.table}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
      >
        <div
          ref={(cell) => { this.cell = cell }}
          className={styles.overflow}
        >
          {this.renderCell()}
        </div>
      </Table.Cell>
    )
  }
}

TableOverflowCell.propTypes = propTypes

TableOverflowCell.defaultProps = defaultProps

export default TableOverflowCell
