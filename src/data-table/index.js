import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Table, Pagination, Button, Form } from 'semantic-ui-react'
import numeral from 'numeral'

import DataTableColumn, {
  propTypes as columnProps,
  defaultProps as columnDefaultProps,
} from './data-table-column'
import customSort from '../utils/sort'

const colPropKeys = Object.keys(columnProps)

const childrenColumnCheck = (props, propName, componentName) => {
  if ((!props.children && !props.columns) || (props.children && props.columns)) {
    return new Error(`Only one of 'children' or 'columns' is allowed in '${componentName}'`)
  }
}

const propTypes = {
  data: PropTypes.array.isRequired,
  children: childrenColumnCheck,
  columns: childrenColumnCheck,
  defaultSortKey: PropTypes.string,
  defaultSortDir: PropTypes.string,
  downloadName: PropTypes.string,
  download: PropTypes.bool,
  perPage: PropTypes.number,
  onRowClick: PropTypes.func,
  isRowActive: PropTypes.func,
  emptySearchMsg: PropTypes.string,
  noColumnsMsg: PropTypes.string,
}

const defaultProps = {
  defaultSortKey: '',
  defaultSortDir: 'descending',
  downloadName: 'Table',
  download: true,
  perPage: 9,
  onRowClick: null,
  isRowActive: null,
  emptySearchMsg: 'Couldn\'t find anything :(',
  noColumnsMsg: 'No columns selected',
}


class DataTable extends Component {
  constructor(props) {
    super(props)

    const { defaultSortKey: sortColumn, defaultSortDir: sortDirection } = this.props
    const picked = this.pickables()
    this.state = {
      sortColumn,
      sortDirection,
      activePage: 1,
      searchInput: '',
      picked,
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

  columns = () => {
    const { children, columns } = this.props

    if (Array.isArray(columns) && columns.length > 0) {
      // apply default here since columns are not DataTableColumn instances
      return columns.map(c => ({ ...columnDefaultProps, ...c }))
    }

    return (Array.isArray(children) ? children : [children])
      .filter(c => c.type === DataTableColumn || c.type.name === 'DataTableColumn')
      .map(c => c.props)
  }

  searchables = () => this.columns().filter(c => c.searchable).map(c => c.dataKey)

  pickables = () => this.columns().filter(c => c.pickable).map(c => c.name)

  pickedColumns = () => {
    const { picked } = this.state

    return this.columns().filter(c => !c.pickable || (c.pickable && picked.includes(c.name)))
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
        sortType: this.columns().find(col => col.dataKey === column).sortType,
        sortDirection: 'ascending',
      })
    }
  }

  handlePick = name => () => {
    const { picked } = this.state

    if (picked.includes(name)) {
      this.setState({ picked: picked.filter(c => c !== name) })
    } else {
      this.setState({ picked: [...picked, name] })
    }
  }

  replaceDiacritics = (str) => {
    const diacritics = [
      {char: 'A', base: /[\300-\306]/g},
      {char: 'a', base: /[\340-\346]/g},
      {char: 'E', base: /[\310-\313]/g},
      {char: 'e', base: /[\350-\353]/g},
      {char: 'I', base: /[\314-\317]/g},
      {char: 'i', base: /[\354-\357]/g},
      {char: 'O', base: /[\322-\330]/g},
      {char: 'o', base: /[\362-\370]/g},
      {char: 'U', base: /[\331-\334]/g},
      {char: 'u', base: /[\371-\374]/g},
      {char: 'N', base: /[\321]/g},
      {char: 'n', base: /[\361]/g},
      {char: 'C', base: /[\307]/g},
      {char: 'c', base: /[\347]/g}
    ]
    diacritics.forEach(function(letter){
      str = str.replace(letter.base, letter.char)
    })
    return str
  }

  search = (text, data) => {
    const array = text.match(' ') ? text.split(' ') : text.split()
    for (let i = 0; i < array.length; i++) {
      if (data.filter(row => (this.searchables().find(c => this.replaceDiacritics(String(row[c] || '')).toLowerCase().includes(array[i])))).length > 0) {
        return data.filter(row => (this.searchables().find(c => this.replaceDiacritics(String(row[c] || '')).toLowerCase().includes(array[i]))))
      } else if (data.filter(row => (this.searchables().find(c => this.replaceDiacritics(String(row[c] || '')).toLowerCase().includes(array[i])))).length === 0) {
        return data.filter(row => (this.searchables().find(c => this.replaceDiacritics(String(row[c] || '')).toLowerCase().includes(array[i+1]))))
      }
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

    return this.search(text, data)
  }

  onSearchInputChange = (_, { value }) => {
    if (value && value.length > 2) {
      this.setState({ activePage: 1 })
    }
    this.setState({ searchInput: value.toLowerCase() })
  }

  createRowClickListener = (rowData) => (mouseEvent) => {
    return this.props.onRowClick(mouseEvent, rowData)
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
      data,
      download,
      perPage,
      onRowClick,
      isRowActive,
      emptySearchMsg,
      noColumnsMsg,
    } = this.props
    const tableProps = Object.entries(this.props)
      .filter(([key]) => !Object.keys(propTypes).includes(key))
      .reduce((acc, [key, value]) => {
        acc[key] = value
        return acc
      }, {})
    const { activePage, sortColumn, sortDirection, sortType, searchInput, picked } = this.state

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

    const columns = this.pickedColumns()

    const sortedData = sortType ? filteredData.sort(
      (a, b) => customSort(
        sortType,
        sortDirection)(a[sortColumn], b[sortColumn])
    ) : filteredData

    // pagination
    const offset = perPage * activePage
    const totalPages = Math.ceil(sortedData.length / perPage)
    const paginatedData = sortedData.filter((d, i) => i >= (offset - perPage) && i < offset)

    // pick/toggle
    const pickables = this.pickables()

    return (
      <div style={{ marginTop: '1em', paddingBottom: '1em' }}>
        <div style={{ width: '100%', overflowX: 'auto' }}>
          {(download || searchables.length > 0) && (
            <div style={{
              padding: '8px',
              border: '1px solid rgba(34, 36, 38, 0.15)',
              borderBottom: 0,
              borderRadius: '4px 4px 0px 0px',
              background: '#F9FAFB',
              overflow: 'auto',
            }}
            >
              <Form size='mini'>
                {searchables.length > 0 && (
                  <Form.Input
                    type='text'
                    placeholder='Search...'
                    value={searchInput}
                    onChange={this.onSearchInputChange}
                    size='medium'
                    icon='search'
                  />
                )}
                <div>
                  {pickables.length > 0 && (
                    <Button.Group size='mini'>
                      {pickables.map(name => (
                        <Button
                          key={name}
                          content={name}
                          primary={picked.includes(name)}
                          onClick={this.handlePick(name)}
                        />
                      ))}
                    </Button.Group>
                  )}
                  {download && (
                    <Button
                      floated='right'
                      size='mini'
                      onClick={this.downloadReport}
                      color='blue'
                      icon='download'
                    />
                  )}
                </div>
              </Form>
            </div>
          )}
          <Table
            sortable
            selectable
            style={{ marginTop: 0, borderRadius: 0 }}
            {...tableProps}
          >
            <Table.Header>
              <Table.Row>
                {columns.map(col => (
                  <Table.HeaderCell
                    key={col.dataKey || col.name}
                    onClick={col.sortable ? this.handleSort(col.dataKey) : null}
                    sorted={sortColumn === col.dataKey ? sortDirection : null}
                  >
                    {col.name}
                  </Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {
                paginatedData.length === 0 &&
                columns.length>0 &&
                <Table.Row textAlign='center'>
                  <Table.HeaderCell colSpan={columns.length}>{emptySearchMsg}</Table.HeaderCell>
                </Table.Row>
              }
              {
                columns.length === 0 &&
                <Table.Row textAlign='center'>
                  <Table.HeaderCell colSpan={columns.length}>{noColumnsMsg}</Table.HeaderCell>
                </Table.Row>
              }
              {paginatedData.map(row => (
                <Table.Row
                  key={row._id}
                  active={typeof isRowActive === 'function' && isRowActive(row)}
                  onClick={typeof onRowClick === 'function' && this.createRowClickListener(row)}>
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
