import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Table, Pagination, Button, Icon, Input } from 'semantic-ui-react'
import { orderBy } from 'lodash'
import numeral from 'numeral'

import DataTableColumn, { propTypes as columnProps } from './data-table-column'


const colPropKeys = Object.keys(columnProps)

const propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  defaultSortKey: PropTypes.string,
  downloadName: PropTypes.string,
  download: PropTypes.bool,
  search: PropTypes.bool,
}

const defaultProps = {
  defaultSortKey: '',
  downloadName: 'Table',
  download: true,
  search: true,
}


const perPage = 9

class DataTable extends Component {
  constructor(props) {
    super(props)

    const { defaultSortKey: sortColumn } = this.props
    this.state = {
      sortColumn,
      activePage: 1,
      sortDirection: 'descending',
      searchInput: '',
    }
  }

  downloadReport = () => {
    const { data, downloadName } = this.props

    const headers = this.columns().map(c => c.name)
    const valueKeys = this.columns().map(c => c.dataKey)

    let csvContent = 'data:text/csv;charset=utf-8,'

    headers.forEach((h) => {
      csvContent += `"${String(h).replace(/"/g, '""')}",`
    })
    csvContent = csvContent.slice(0, -1)
    csvContent += '\r\n'

    data.forEach((d) => {
      valueKeys.forEach((x) => {
        csvContent += `"${String(d[x]).replace(/"/g, '""')}",`
      })
      csvContent = csvContent.slice(0, -1)
      csvContent += '\r\n'
    })

    const url = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `${downloadName}.csv`)
    document.body.appendChild(link)

    link.click()
    link.remove()
  }

  columns() {
    const { children } = this.props
    return (Array.isArray(children) ? children : [children])
      .filter(c => c.type === DataTableColumn || c.type.name === 'DataTableColumn')
      .map(c => c.props)
  }

  searchables() {
    return this.columns()
      .filter(c => c.searchable)
      .map(c => c.dataKey)
  }

  onPageChange = (_, { activePage }) => {
    this.setState({ activePage })
  }

  handleSort = column => () => {
    const { sortColumn, sortDirection } = this.state
    if (column === sortColumn) {
      this.setState({
        activePage: 1,
        sortDirection:
          sortDirection === 'ascending' ? 'descending' : 'ascending',
      })
    } else {
      this.setState({
        activePage: 1,
        sortColumn: column,
        sortDirection: 'ascending',
      })
    }
  }

  getFilteredData() {
    const { data } = this.props
    const { searchInput } = this.state
    const text = searchInput.toLowerCase()
    const searchables = this.searchables()

    if (searchables.length === 0) {
      return data
    }

    return data
      .filter(row => (searchables
        .find(c => row[c].toLowerCase().includes(text))))
  }

  onSearchInputChange = (_, { value }) => {
    this.setState({ searchInput: value.toLowerCase() })
  }

  renderCell = (row, col) => {
    if (col.nullTemplate && (row[col.dataKey] === null || row[col.dataKey] === undefined)) {
      return col.nullTemplate
    }
    if (col.format) {
      return numeral(row[col.dataKey]).format(col.format)
    }
    if (col.template) {
      return col.template(row[col.dataKey], row)
    }

    return row[col.dataKey]
  }

  render() {
    const {
      // standard data-table props
      data, download, search, children, defaultSortKey, downloadName,
      // semantic table props pass-through
      ...tableProps
    } = this.props
    const { activePage, sortColumn, sortDirection, searchInput } = this.state

    // set unique row key
    let id = 0
    data.forEach((row) => {
      id += 1
      row._id = id
    })

    // searching
    const searchables = this.searchables()
    const filteredData = searchInput && searchInput.length > 2
      ? this.getFilteredData()
      : data

    // sorting, todo: remove lodash
    const sortedData = orderBy(filteredData, [sortColumn], sortDirection.slice(0, -6))

    // pagination
    const offset = perPage * activePage
    const totalPages = Math.ceil(sortedData.length / perPage)
    const paginatedData = sortedData.filter((d, i) => i >= (offset - perPage) && i < offset)

    const columns = this.columns()

    return (
      <div style={{ paddingBottom: '1rem' }}>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          {(download || search && searchables.length > 0) && (
            <div style={{
              padding: '8px',
              border: '1px solid rgba(34, 36, 38, 0.15)',
              borderBottom: 0,
              borderRadius: '4px 4px 0px 0px',
              background: '#F9FAFB',
              overflow: 'auto',
            }}
            >
              {search && searchables.length > 0 && (
                <Input
                  type='text'
                  placeholder='Search...'
                  value={searchInput}
                  onChange={this.onSearchInputChange}
                  size='medium'
                  icon='search'
                />
              )}
              {download && (
                <Button onClick={this.downloadReport} floated='right' color='blue'>
                  <Button.Content visible>
                    <Icon name='download' />
                  </Button.Content>
                </Button>
              )}
            </div>
          )}
          <Table
            sortable
            selectable
            style={{
              marginTop: 0,
              borderRadius: '0',
            }}
            {...tableProps}
          >
            <Table.Header>
              <Table.Row>
                {columns.map(col => (
                  <Table.HeaderCell
                    key={col.dataKey || col.name}
                    onClick={this.handleSort(col.dataKey)}
                    sorted={sortColumn === col.dataKey ? sortDirection : null}
                  >
                    {col.name}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {paginatedData.map(row => (
                <Table.Row key={row._id}>
                  {columns.map((col) => {
                    // split out generic ...celProps passed-through similar to ...tableProps
                    const cellProps = { ...col }
                    const colProps = {}
                    colPropKeys.forEach((key) => {
                      if (key in cellProps) {
                        colProps[key] = cellProps[key]
                        delete cellProps[key]
                      }
                    })
                    return (
                      <Table.Cell key={col.dataKey || col.name} {...cellProps}>
                        {this.renderCell(row, colProps)}
                      </Table.Cell>
                    )
                  })}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
        {totalPages > 1 && (
          <div style={{
            padding: '8px',
            border: '1px solid rgba(34, 36, 38, 0.15)',
            borderTop: 0,
            borderRadius: '0px 0px 4px 4px',
            background: '#F9FAFB',
          }}
          >
            <Pagination
              activePage={activePage}
              totalPages={totalPages}
              onPageChange={this.onPageChange}
            />
          </div>
        )}
      </div>
    )
  }
}

DataTable.Column = DataTableColumn

DataTable.propTypes = propTypes
DataTable.defaultProps = defaultProps

export default DataTable
