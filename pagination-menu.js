import React from 'react'
import PropTypes from 'prop-types'

import { Menu, Icon } from 'semantic-ui-react'

import styles from './pagination-menu.css'


const propTypes = {
  page: PropTypes.number.isRequired,
  maxPages: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
  numEntries: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
}

const PaginationMenu = ({ page, maxPages, goToPage, numEntries, pageSize }) => {
  const disablePrev = page === 1
  const disableNext = page === maxPages

  const pageButtons = []

  const nextPage = () => {
    if (page !== maxPages) {
      goToPage(page + 1)
    }
  }

  const prevPage = () => {
    if (page !== 1) {
      goToPage(page - 1)
    }
  }

  const selectPage = (e, { name }) => {
    goToPage(parseInt(name))
  }

  if (page > 2) {
    pageButtons.push(<Menu.Item key={page - 2} name={String(page - 2)} onClick={selectPage} />)
  }
  if (page > 1) {
    pageButtons.push(<Menu.Item key={page - 1} name={String(page - 1)} onClick={selectPage} />)
  }

  pageButtons.push(<Menu.Item key={page} name={String(page)} active onClick={selectPage} />)

  if (page < maxPages) {
    pageButtons.push(<Menu.Item key={page + 1} name={String(page + 1)} onClick={selectPage} />)
  }
  if (page < maxPages - 1) {
    pageButtons.push(<Menu.Item key={page + 2} name={String(page + 2)} onClick={selectPage} />)
  }

  if (page <= 2 && pageButtons.length < maxPages) {
    let nextPage = 3
    while (pageButtons.length < Math.min(5, maxPages)) {
      pageButtons.push((
        <Menu.Item key={page + nextPage} name={String(page + nextPage)} onClick={selectPage} />
      ))
      nextPage += 1
    }
  }

  if (page >= maxPages - 1 && pageButtons.length < maxPages) {
    let nextPage = 3
    while (pageButtons.length < Math.min(5, maxPages)) {
      pageButtons.unshift((
        <Menu.Item key={page - nextPage} name={String(page - nextPage)} onClick={selectPage} />
      ))
      nextPage += 1
    }
  }

  const parseInterval = () => (
    `${((page - 1) * pageSize) + 1}-${Math.min(page * pageSize, numEntries)} of ${numEntries}`
  )

  const style = {
    float: 'right',
    display: 'inline-flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
  }

  return (
    <div style={style}>
      <div>
        {parseInterval()}
      </div>
      <Menu floated='right' pagination className={styles.pagination}>
        <Menu.Item onClick={prevPage} disabled={disablePrev}>
          <Icon name='chevron left' />
        </Menu.Item>
        {pageButtons}
        <Menu.Item onClick={nextPage} disabled={disableNext}>
          <Icon name='chevron right' />
        </Menu.Item>
      </Menu>
    </div>
  )
}

PaginationMenu.propTypes = propTypes

export default PaginationMenu
