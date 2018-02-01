import React from 'react'
import PropTypes from 'prop-types'

import { Table, Header } from 'semantic-ui-react'

import styles from './empty-table-body.css'


const propTypes = {
  content: PropTypes.string,
  colSpan: PropTypes.number.isRequired,
}

const defaultProps = { content: 'Table is Empty' }

const EmptyTableBody = ({ content, colSpan }) => (
  <Table.Row>
    <Table.Cell className={styles.emptyCell} textAlign='center' colSpan={colSpan}>
      <Header content={content} />
    </Table.Cell>
  </Table.Row>
)

EmptyTableBody.propTypes = propTypes

EmptyTableBody.defaultProps = defaultProps

export default EmptyTableBody
