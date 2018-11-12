import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Table, Pagination, Button, Icon, Input } from 'semantic-ui-react'
import { orderBy } from 'lodash'
import numeral from 'numeral'

import DataTableColumn from './data-table-column'


const propTypes = {
  data: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
  defaultSortKey: PropTypes.string,
  downloadName: PropTypes.string,
  download: PropTypes.bool,
}

const defaultProps = {
  defaultSortKey: '',
  downloadName: 'Table',
  download: true,
}


const perPage = 9

class DataTable extends Component {
  state = {
    activePage: 1,
    sortColumn: this.props.defaultSortKey,
    sortDirection: 'descending',
    searchInput: '',
  }

  downloadReport = () => {
    const headers = this.columns().map(c => c.name)
    const valueKeys = this.columns().map(c => c.dataKey)

    let csvContent = 'data:text/csv;charset=utf-8,'

    headers.forEach((h) => {
      csvContent += `${h},`
    })
    csvContent = csvContent.slice(0, -1)
    csvContent += '\r\n'

    this.props.data.forEach((d) => {
      valueKeys.forEach((x) => {
        csvContent += `${String(d[x]).replace(/,/g, '')},`
      })
      csvContent = csvContent.slice(0, -1)
      csvContent += '\r\n'
    })

    const url = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `${this.props.downloadName}.csv`)
    document.body.appendChild(link)

    link.click()
    link.remove()
  }

  columns() {
    return this.props.children
      .filter(c => c.type === DataTableColumn || c.type.name === 'DataTableColumn')
      .map(c => c.props)
  }

  onPageChange = (_, { activePage }) => {
    this.setState({ activePage })
  }

  handleSort = column => () => {
    if (column === this.state.sortColumn) {
      this.setState({
        activePage: 1,
        sortDirection:
          this.state.sortDirection === 'ascending' ? 'descending' : 'ascending',
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
    const text = this.state.searchInput.toLowerCase()
    const searchables = this.columns()
      .filter(c => c.searchable)
      .map(c => c.dataKey)

    if (searchables.length === 0) {
      return this.props.data
    }

    return this.props.data
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
    const { data, download } = this.props
    const { activePage, sortColumn, sortDirection, searchInput } = this.state

    // set unique row key
    let id = 0
    data.forEach((row) => {
      id += 1
      row._id = id
    })

    // searching
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
          <div style={{
            padding: '8px',
            border: '1px solid rgba(34, 36, 38, 0.15)',
            borderBottom: 0,
            borderRadius: '4px 4px 0px 0px',
            background: '#F9FAFB',
          }}
          >
            <Input
              type='text'
              placeholder='Search...'
              value={this.state.searchInput}
              onChange={this.onSearchInputChange}
              size='medium'
              icon='search'
            />
            {download && (
              <Button onClick={this.downloadReport} floated='right' color='blue'>
                <Button.Content visible>
                  <Icon name='download' />
                </Button.Content>
              </Button>
            )}
          </div>
          <Table
            sortable
            selectable
            style={{
              marginTop: 0,
              borderRadius: '0',
            }}
          >
            <Table.Header>
              <Table.Row>
                {columns.map(col => (
                  <Table.HeaderCell
                    key={col.dataKey || col.name}
                    onClick={this.handleSort(col.dataKey)}
                    sorted={sortColumn === col.dataKey ? sortDirection : null}
                  >{col.name}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {paginatedData.map(row => (
                <Table.Row key={row._id}>
                  {columns.map(col => (
                    <Table.Cell key={col.dataKey || col.name}>
                      {this.renderCell(row, col)}
                    </Table.Cell>
                  ))}
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
