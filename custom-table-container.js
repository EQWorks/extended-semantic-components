import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { sortBy, remove } from 'lodash'

import CustomerTable from './custom-table'


const propTypes = {
  headerCells: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      content: PropTypes.string,
      sortedBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      key: PropTypes.string,
    }),
    PropTypes.shape({ Custom: PropTypes.element }),
  ])).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderRow: PropTypes.object.isRequired,
  emptyTableMsg: PropTypes.string,
  defaultSort: PropTypes.string.isRequired,
  defaultDir: PropTypes.oneOf(['ascending', 'descending']),
  secondarySort: PropTypes.shape({
    sortedBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    dir: PropTypes.oneOf(['ascending', 'descending']),
  }),
  pageSize: PropTypes.number,
  options: PropTypes.object,
  className: PropTypes.string,

  pickableTable: PropTypes.bool,
  defaultColumns: PropTypes.arrayOf(PropTypes.string),
  pickableColumns: PropTypes.arrayOf(PropTypes.string),
  defaultPickedColummns: PropTypes.arrayOf(PropTypes.string),

  exportTable: PropTypes.bool,
  exportTitle: PropTypes.string,
}

const defaultProps = {
  emptyTableMsg: null,
  defaultDir: 'ascending',
  secondarySort: null,
  pageSize: 10,
  options: {},
  className: '',

  pickableTable: false,
  defaultColumns: [],
  pickableColumns: [],
  defaultPickedColummns: null,

  exportTable: false,
  exportTitle: null,
}

class CustomTableContainer extends Component {
  constructor(props) {
    super(props)

    const selectedColumns = props.pickableTable && props.defaultPickedColummns ?
      [...props.defaultColumns, ...props.defaultPickedColummns] :
      props.headerCells.map(c => c.key)

    this.state = {
      sortDir: props.defaultDir,
      sortedBy: props.defaultSort,
      page: 1,
      selectedColumns,
    }
  }

  handleSelectorClick = selector => () => {
    const { selectedColumns } = this.state

    if (selectedColumns.includes(selector)) {
      const newSelectedColumns = remove(selectedColumns.slice(0), c => c !== selector)
      this.setState({ selectedColumns: newSelectedColumns })
    } else {
      this.setState({ selectedColumns: [...selectedColumns, selector] })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.resetTable(nextProps)
    }
  }

  resetTable({ pickableTable, defaultPickedColummns, defaultColumns, headerCells }) {
    const selectedColumns = pickableTable && defaultPickedColummns ?
      [...defaultColumns, ...defaultPickedColummns] :
      headerCells.map(c => c.key)

    this.setState({ selectedColumns, page: 1 })
  }

  sortData() {
    const { secondarySort, data } = this.props
    const { sortedBy, sortDir } = this.state

    let sortedData = data

    if (secondarySort) {
      sortedData = sortBy(sortedData, secondarySort.sortedBy)
      if (
        (secondarySort.dir === 'descending' && sortDir === 'ascending') ||
        (secondarySort.dir === 'ascending' && sortDir === 'descending')
      ) {
        sortedData.reverse()
      }
    }

    sortedData = sortBy(sortedData, sortedBy)

    if (sortDir === 'descending') {
      sortedData.reverse()
    }

    return sortedData
  }

  handleHeaderClick = header => () => {
    const { sortedBy, sortDir } = this.state

    if (sortedBy !== header) {
      this.setState({
        sortedBy: header,
        sortDir: 'ascending',
        page: 1,
      })
    } else {
      this.setState({
        sortDir: sortDir === 'ascending' ? 'descending' : 'ascending',
        page: 1,
      })
    }
  }

  goToPage = (page) => { this.setState({ page }) }

  render() {
    const {
      emptyTableMsg,
      pageSize,
      options,
      pickableTable,
      headerCells,
      pickableColumns,
      renderRow,
      exportTable,
      exportTitle,
      className,
    } = this.props
    const {
      selectedColumns,
      sortDir,
      sortedBy,
      page,
    } = this.state

    const sortedData = this.sortData()

    return (
      <CustomerTable
        className={className}
        goToPage={this.goToPage}
        handleHeaderClick={this.handleHeaderClick}
        handleSelectorClick={this.handleSelectorClick}
        headers={headerCells}
        pickableColumns={pickableColumns}
        renderRow={renderRow}
        selectedHeaders={selectedColumns}
        sortDir={sortDir}
        sortedBy={sortedBy}
        data={sortedData}
        emptyTableMsg={emptyTableMsg}
        pageSize={pageSize}
        options={options}
        pickableTable={pickableTable}
        page={page}
        exportTable={exportTable}
        exportTitle={exportTitle}
      />
    )
  }
}

CustomTableContainer.propTypes = propTypes

CustomTableContainer.defaultProps = defaultProps

export default CustomTableContainer
