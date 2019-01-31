/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'


const propTypes = {
  name: PropTypes.string.isRequired,
  dataKey: PropTypes.string,
  searchable: PropTypes.bool,
  pickable: PropTypes.bool,
  format: PropTypes.string,
  nullTemplate: PropTypes.string,
  template: PropTypes.func,
  sortable: PropTypes.bool,
  sortType: PropTypes.string,
}

const defaultProps = {
  searchable: false,
  pickable: false,
  format: null,
  template: null,
  nullTemplate: null,
  sortable: true,
  sortType: 'string',
}

class DataTableColumn extends React.Component { }

DataTableColumn.propTypes = propTypes
DataTableColumn.defaultProps = defaultProps

export default DataTableColumn
export { propTypes }
