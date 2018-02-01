import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { omit } from 'lodash'


const propTypes = {
  list: PropTypes.array.isRequired,
  listName: PropTypes.string.isRequired,
  pageSize: PropTypes.number,
  Component: PropTypes.func.isRequired,
  scrollingDiv: PropTypes.bool,
  divClassName: PropTypes.string,
  divStyle: PropTypes.object,
}

const defaultProps = {
  pageSize: 10,
  scrollingDiv: false,
  divClassName: '',
  divStyle: {},
}

class ListLoader extends Component {
  constructor(props) {
    super(props)

    const subList = props.list.slice(0, props.pageSize)

    if (!props.scrollingDiv) {
      document.addEventListener('scroll', this.loadList)
    }

    this.state = {
      subList,
      page: 0,
    }
  }

  componentWillUnmount() {
    if (this.props.scrollingDiv) {
      this.container.removeEventListener('scroll', this.loadList)
    } else {
      document.removeEventListener('scroll', this.loadList)
    }
  }

  componentDidMount() {
    if (this.props.scrollingDiv) {
      this.container.addEventListener('scroll', this.loadList)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list) {
      this.loadNewList(nextProps.list)
    }
  }

  loadNewList(list) {
    const { pageSize } = this.props
    const subList = list.slice(0, pageSize)
    this.setState({ subList, page: 1 })
  }

  loadList = () => {
    const { list, pageSize, scrollingDiv } = this.props
    const { page } = this.state

    const totalHeight = scrollingDiv ?
      this.container.scrollHeight :
      document.height || document.body.scrollHeight

    const scrollDistance = scrollingDiv ?
      this.container.scrollTop + this.container.clientHeight :
      window.scrollY + window.innerHeight

    const scrolled = totalHeight - scrollDistance <= totalHeight / 2
    if (scrolled && this.state.subList.length < list.length) {
      const subList = list.slice(0, pageSize * (page + 1))
      this.setState({ subList, page: page + 1 })
    }
  }

  render() {
    const { listName, Component, scrollingDiv, divStyle, divClassName } = this.props
    const { subList } = this.state

    const componentProps = omit(
      this.props,
      [
        'pageSize',
        'list',
        'listName',
        'Component',
        'parentElement',
        'scrollingDiv',
        'divStyle',
        'divClassName',
      ],
    )

    componentProps[listName] = subList

    if (scrollingDiv) {
      const defaultStyle = {
        overflowY: 'auto',
        height: divClassName ? null : '30rem',
      }

      return (
        <div
          style={{ ...defaultStyle, ...divStyle }}
          className={divClassName}
          ref={(ref) => { this.container = ref }}
        >
          <Component
            {...componentProps}
          />
        </div>
      )
    }

    return (
      <Component
        {...componentProps}
      />
    )
  }
}

ListLoader.propTypes = propTypes

ListLoader.defaultProps = defaultProps

export default ListLoader
