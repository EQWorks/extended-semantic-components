/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
  name: PropTypes.string.isRequired,
  dataKey: PropTypes.string,
  searchable: PropTypes.bool,
  format: PropTypes.string,
  nullTemplate: PropTypes.string,
  template: PropTypes.func,
}

const defaultProps = { searchable: false, format: null, template: null, nullTemplate: null }

class DataTableColumn extends React.Component { }

DataTableColumn.propTypes = propTypes
DataTableColumn.defaultProps = defaultProps


export default DataTableColumn
export { propTypes }
