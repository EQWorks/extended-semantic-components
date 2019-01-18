import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { momentObj } from 'react-moment-proptypes'

import { Button, Popup } from 'semantic-ui-react'
// TODO: take this out and make it a standalone open-source NPM package
import { DayPickerRangeController } from 'react-dates'
import moment from 'moment'


const propTypes = {
  endDate: momentObj,
  startDate: momentObj,
  onSelection: PropTypes.func.isRequired,
  btnProps: PropTypes.object,
  position: PropTypes.string,
  maximumNights: PropTypes.number,
  blockedStart: momentObj,
  blockedEnd: momentObj,
}

const defaultProps = {
  endDate: null,
  startDate: null,
  btnProps: {},
  position: 'bottom center',
  maximumNights: 0,
  blockedStart: null,
  blockedEnd: null,
}

class DateRangePicker extends Component {
  constructor(props) {
    super(props)
    const { startDate, endDate } = props
    this.state = {
      focusedInput: null,
      isOpen: false,
      startDate: startDate ? moment(startDate) : startDate,
      endDate: endDate ? moment(endDate) : endDate,
    }
  }

  componentDidUpdate(prevProps) {
    const { startDate, endDate } = this.props
    const { startDate: _start, endDate: _end } = prevProps
    // update local versions only when they're changed
    if ((startDate || _start) && !moment(_start).isSame(startDate)) {
      this.setState({ startDate })
    }
    if ((endDate || _end) && !moment(_end).isSame(endDate)) {
      this.setState({ endDate })
    }
  }

  open = (e) => {
    e.preventDefault()
    this.setState({
      isOpen: true,
      startDate: null,
      endDate: null,
    })
  }

  close = () => {
    const { startDate, endDate } = this.props
    this.setState({
      isOpen: false,
      startDate: startDate ? moment(startDate) : null,
      endDate: endDate ? moment(endDate) : null,
    })
  }

  onOpen = () => {
    this.setState({ focusedInput: 'startDate' })
  }

  onFocusChange = (focusedInput) => {
    if (!focusedInput) {
      this.setState({ focusedInput: 'startDate' })
    } else {
      this.setState({ focusedInput })
    }
  }

  onDatesChange = ({ startDate, endDate }) => {
    const endStart = moment(endDate).startOf('day')
    const currEndStart = moment(this.state.endDate).startOf('day')
    if (!(endDate === null || endStart.isSame(currEndStart))) {
      this.close()
      this.props.onSelection({ startDate, endDate })
    }
    this.setState({ startDate, endDate })
  }

  isOutsideRange = (day) => {
    const { focusedInput, startDate } = this.state
    const { maximumNights, blockedStart, blockedEnd } = this.props

    const dayStart = moment(day).startOf('day')
    const startStart = moment(startDate).startOf('day')

    let blocked = false

    if (maximumNights > 0 && moment(startDate).isValid() && focusedInput === 'endDate') {
      const maxLimit = moment(startStart).add(maximumNights, 'days')
      blocked = blocked || dayStart.isSameOrAfter(maxLimit)
    }

    if (moment(blockedStart).isValid()) {
      blocked = blocked || dayStart.isBefore(moment(blockedStart).startOf('day'))
    }

    if (moment(blockedEnd).isValid()) {
      blocked = blocked || dayStart.isAfter(moment(blockedEnd).startOf('day'))
    }

    return blocked
  }

  renderTrigger = () => {
    const { btnProps } = this.props
    const { startDate, endDate } = this.state
    const endDateString = endDate ? endDate.format('ll') : 'Select End Date'

    const durationString = startDate ?
      `${(startDate.format('ll'))} \u2192 ${endDateString}` :
      'Select Date Range'

    return (
      <Button
        basic
        {...btnProps}
        content={durationString}
        onClick={this.open}
      />
    )
  }

  renderPicker = () => {
    const { startDate, endDate, focusedInput } = this.state

    return (
      <DayPickerRangeController
        startDate={startDate}
        endDate={endDate}
        onDatesChange={this.onDatesChange}
        focusedInput={focusedInput}
        onFocusChange={this.onFocusChange}
        isOutsideRange={this.isOutsideRange}
        numberOfMonths={2}
        hideKeyboardShortcutsPanel
        minimumNights={0}
      />
    )
  }

  render() {
    const { position } = this.props

    return (
      <Popup
        basic
        trigger={this.renderTrigger()}
        content={this.renderPicker()}
        on='click'
        onOpen={this.onOpen}
        onClose={this.close}
        open={this.state.isOpen}
        position={position}
        style={{ maxWidth: '800px' }}
      />
    )
  }
}

DateRangePicker.propTypes = propTypes
DateRangePicker.defaultProps = defaultProps

export default DateRangePicker
