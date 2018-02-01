import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'semantic-ui-react'
import JSPDF from 'jspdf'
import 'jspdf-autotable'


const propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  options: PropTypes.object,
  orientation: PropTypes.oneOf(['landscape', 'portrait']),
}

const defaultProps = {
  title: null,
  options: {},
  orientation: 'portrait',
}

const ExportTableButtons = ({ data, headers, options, title, orientation }) => {
  const genPDF = () => {
    const pdf = new JSPDF(orientation[0], 'pt', 'letter')

    const columns = headers.map(({ content, key }) => ({ title: content, dataKey: key }))

    const options = {
      theme: 'striped',
      margin: 80,
      styles: { lineWidth: 1 },
      drawCell: (cell, data) => {
        const paddingLeft = cell.width - cell.contentWidth

        if (data.column.dataKey !== 'date') {
          cell.textPos.x += paddingLeft
        } else {
          cell.textPos.x += paddingLeft / 2
        }
      },
      drawHeaderCell: (cell) => {
        const paddingLeft = cell.width - cell.contentWidth
        cell.textPos.x += paddingLeft / 2
      },
    }

    if (title) {
      options.addPageContent = () => {
        const midPageSize = (pdf.internal.pageSize.width / 2)
        const textSize = (pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / 2)
        const xOffset = midPageSize - textSize

        pdf.text(title, xOffset, 60)
      }
    }

    pdf.autoTable(columns, data, options)

    return pdf
  }

  const printData = () => {
    const pdf = genPDF()
    pdf.autoPrint()
    const url = pdf.output('bloburl')
    window.open(url)
  }

  const savePDF = () => {
    const pdf = genPDF()
    pdf.save(`${title}.pdf`)
  }

  const saveCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,'

    headers.forEach((h) => {
      csvContent += `${h.content},`
    })
    csvContent = csvContent.slice(0, -1)
    csvContent += '\r\n'

    data.forEach((d) => {
      headers.forEach(({ key }) => {
        csvContent += `${d[key].replace(',', '')},`
      })
      csvContent = csvContent.slice(0, -1)
      csvContent += '\r\n'
    })

    const url = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `${title}.csv`)
    document.body.appendChild(link)

    link.click()
    link.remove()
  }

  return (
    <Button.Group {...options}>
      <Button
        content='Print'
        primary
        onClick={printData}
      />
      <Button
        content='CSV'
        primary
        onClick={saveCSV}
      />
      <Button
        content='PDF'
        primary
        onClick={savePDF}
      />
    </Button.Group>
  )
}

ExportTableButtons.propTypes = propTypes

ExportTableButtons.defaultProps = defaultProps

export default ExportTableButtons
