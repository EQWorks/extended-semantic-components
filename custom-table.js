import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'

import { Table, Button } from 'semantic-ui-react'

import PaginationMenu from './pagination-menu'
import EmptyTableBody from './empty-table-body'
import styles from './custom-table.css'
import ExportTableButtons from './export-table-buttons'


const propTypes = {
  headers: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      content: PropTypes.string,
      sortedBy: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      key: PropTypes.string,
    }),
    PropTypes.shape({ Custom: PropTypes.element }),
  ])).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderRow: PropTypes.object.isRequired,
  emptyTableMsg: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  className: PropTypes.string,

  goToPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,

  handleHeaderClick: PropTypes.func.isRequired,
  handleSelectorClick: PropTypes.func.isRequired,
  sortDir: PropTypes.oneOf(['ascending', 'descending']).isRequired,
  sortedBy: PropTypes.string.isRequired,

  pickableTable: PropTypes.bool.isRequired,
  selectedHeaders: PropTypes.arrayOf(PropTypes.string),
  defaultColumns: PropTypes.arrayOf(PropTypes.string),
  pickableColumns: PropTypes.arrayOf(PropTypes.string),
  defaultPickedColummns: PropTypes.arrayOf(PropTypes.string),

  exportTable: PropTypes.bool.isRequired,
  exportTitle: PropTypes.string,
  exportClassName: PropTypes.string,
}

const defaultProps = {
  className: '',

  selectedHeaders: null,
  defaultColumns: null,
  pickableColumns: null,
  defaultPickedColummns: null,

  exportTitle: null,
  exportClassName: null,
}

const CustomTable = ({
  className,
  data,
  emptyTableMsg,
  goToPage,
  handleHeaderClick,
  handleSelectorClick,
  headers,
  options,
  page,
  pageSize,
  pickableColumns,
  pickableTable,
  renderRow,
  selectedHeaders,
  sortDir,
  sortedBy,
  exportTable,
  exportTitle,
}) => {
  const renderHeaderCells = () => {
    const sorted = column => (sortedBy === column ? sortDir : null)

    const headersToRender = headers.filter(c => (selectedHeaders.includes(c.key)))
    const headerCells = headersToRender.map(({ content, sortedBy, key, Custom }) => {
      const headerProps = {}

      if (sortedBy) {
        headerProps.sorted = sorted(key)
        headerProps.onClick = handleHeaderClick(key)
      }

      if (Custom) {
        return cloneElement(Custom, headerProps)
      }

      return <Table.HeaderCell {...headerProps} content={content} key={key} />
    })

    return (
      <Table.Row textAlign='center'>
        {headerCells}
      </Table.Row>
    )
  }

  const renderHeaderSelector = () => (
    <Button.Group floated='right'>
      {pickableColumns.map((col) => {
        const { content } = headers.find(h => h.key === col)

        return (
          <Button
            key={col}
            compact
            content={content}
            primary={selectedHeaders.includes(col)}
            onClick={handleSelectorClick(col)}
          />
        )
      })}
    </Button.Group>
  )

  const renderBody = () => {
    const startIndex = (page - 1) * pageSize
    const endIndex = Math.min(page * pageSize, data.length)

    const displayedData = data.slice(startIndex, endIndex)

    const renderedRows = displayedData.map((d) => {
      const row = {}

      row.props = renderRow.props(d)

      for (const cell of headers) {
        const { key } = cell

        row[key] = renderRow[key](d)
      }

      return row
    })

    return renderedRows.map(row => (
      <Table.Row {...row.props}>
        {headers
          .filter(c => (selectedHeaders.includes(c.key)))
          .map(c => row[c.key])
        }
      </Table.Row>
    ))
  }


  const colSpan = selectedHeaders.length
  const maxPages = Math.ceil(data.length / pageSize)

  return (
    <div className={`${className} ${styles.outerTable}`}>
      <Table sortable {...options}>
        <Table.Header>
          {(pickableTable || exportTable) &&
            <Table.Row>
              <Table.HeaderCell colSpan={colSpan}>
                {exportTable &&
                  <ExportTableButtons
                    title={exportTitle}
                    data={data}
                    headers={headers}
                    options={{
                      floated: pickableTable ? 'left' : 'right',
                      compact: true,
                    }}
                  />
                }
                {pickableTable &&
                  renderHeaderSelector()
                }
              </Table.HeaderCell>
            </Table.Row>
          }
          {renderHeaderCells()}
        </Table.Header>
        <Table.Body>
          {data.length > 0 ?
            renderBody() :
            <EmptyTableBody colSpan={colSpan} content={emptyTableMsg} />
          }
        </Table.Body>
        {maxPages !== 1 &&
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan={colSpan}>
              <PaginationMenu
                page={page}
                pageSize={pageSize}
                maxPages={maxPages}
                goToPage={goToPage}
                numEntries={data.length}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
        }
      </Table>
    </div>
  )
}

CustomTable.propTypes = propTypes

CustomTable.defaultProps = defaultProps

export default CustomTable
