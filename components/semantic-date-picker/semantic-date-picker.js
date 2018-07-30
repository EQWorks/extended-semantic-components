import React, { Component } from 'react'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import PropTypes from 'prop-types'

import { Popup, Label } from 'semantic-ui-react'
import moment from 'moment-timezone'
import { DayPickerRangeController } from 'react-dates'
import { momentObj } from 'react-moment-proptypes'

import styles from './semantic-date-picker.css'
import 'semantic-ui-css/semantic.min.css'


const formatDateToLocale = (dt, tz = 'America/Toronto') => (
  moment.tz(dt, tz).toDate().toLocaleDateString()
)

const propTypes = {
  endDate: momentObj,
  startDate: momentObj,
  onSelection: PropTypes.func,
  blockedEnd: momentObj,
  blockedStart: momentObj,
  endDateOnly: PropTypes.bool,
  labelProps: PropTypes.object,
  numberOfMonths: PropTypes.number,
  position: PropTypes.string,
  keepOpenOnSelection: PropTypes.bool,
  keepDatesOnOpen: PropTypes.bool,
}

const defaultProps = {
  endDate: null,
  startDate: null,
  onSelection: () => {},
  blockedEnd: null,
  blockedStart: null,
  endDateOnly: false,
  labelProps: {},
  numberOfMonths: 1,
  position: null,
  keepOpenOnSelection: false,
  keepDatesOnOpen: false,
}

class SemanticDatePicker extends Component {
  constructor(props) {
    super(props)

    const { startDate } = props
    const endDate = startDate ? props.endDate : null

    this.state = {
      focusedInput: null,
      isOpen: false,
      startDate: startDate ? moment(startDate) : null,
      endDate: endDate ? moment(endDate) : null,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { startDate, endDate, isOpen } = this.state
    const { onSelection } = this.props

    if (prevState.isOpen === true && isOpen === false) {
      onSelection({ startDate, endDate })
    }
  }

  open = () => {
    const { keepDatesOnOpen, endDateOnly } = this.props
    if (!keepDatesOnOpen) {
      this.setState({ endDate: null })
      if (!endDateOnly) {
        this.setState({ startDate: null })
      }
    }
    this.setState({ isOpen: true })
  }

  close = () => {
    this.setState({ isOpen: false })
  }

  setFocusedInput() {
    const { endDateOnly } = this.props
    this.setState({ focusedInput: endDateOnly ? 'endDate' : 'startDate' })
  }

  onFocusChange = (focus) => {
    if (focus === null) {
      this.setFocusedInput()
    } else {
      this.setState({ focusedInput: focus })
    }
  }

  onOpen = () => {
    this.setFocusedInput()
  }

  renderTrigger() {
    const { labelProps } = this.props
    const { startDate, endDate } = this.state

    const startDateString = formatDateToLocale(startDate)
    const endDateString = endDate ? formatDateToLocale(endDate) : 'Select Date'

    const durationString = startDate
      ? `${(startDateString)} \u2192 ${endDateString}`
      : 'Select a Date Range'

    return (
      <Label
        basic
        content={durationString}
        {...labelProps}
        className={`${styles.label} ${labelProps.className}`}
        onClick={this.open}
      />
    )
  }

  onDatesChange = ({ startDate, endDate }) => {
    const { endDate: endDateState } = this.state
    const { keepOpenOnSelection } = this.props
    const endStart = moment(endDate).startOf('day')
    const currEndStart = moment(endDate).startOf('day')

    if (!(endDateState === null || endStart.isSame(currEndStart))) {
      if (!keepOpenOnSelection) {
        this.close()
      }
    }

    this.setState({ startDate, endDate })
  }

  isOutsideRange = (day) => {
    const {
      endDateOnly,
      blockedEnd,
      blockedStart,
      startDate,
    } = this.props
    const dayStart = moment(day).startOf('day')
    const startStart = moment(startDate).startOf('day')
    let blocked = false
    if (endDateOnly) {
      blocked = blocked || dayStart.isBefore(startStart)
    }

    if (moment(blockedStart).isValid()) {
      blocked = blocked || dayStart.isBefore(moment(blockedStart).startOf('day'))
    }

    if (moment(blockedEnd).isValid()) {
      blocked = blocked || dayStart.isAfter(moment(blockedEnd).startOf('day'))
    }

    return blocked
  }

  initialVisibleMonth = () => {
    const { numberOfMonths, blockedEnd, endDate, keepDatesOnOpen, endDateOnly } = this.props
    let initialMonth = moment()

    if (keepDatesOnOpen || endDateOnly) {
      if (moment(endDate).isValid()) {
        initialMonth = moment(endDate)
      } else if (moment(blockedEnd).isValid()) {
        initialMonth = moment(blockedEnd)
      }

      if (numberOfMonths > 1) {
        initialMonth.subtract(1, 'month')
      }
    }

    return initialMonth
  }

  renderDatePicker() {
    const { focusedInput, startDate, endDate } = this.state
    const { numberOfMonths } = this.props

    return (
      <div className='semanticCalendar'>
        <DayPickerRangeController
          startDate={startDate}
          endDate={endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={focusedInput}
          onFocusChange={this.onFocusChange}
          numberOfMonths={numberOfMonths}
          isOutsideRange={this.isOutsideRange}
          hideKeyboardShortcutsPanel
          initialVisibleMonth={this.initialVisibleMonth}
          minimumNights={0}
        />
      </div>
    )
  }

  render() {
    const { position } = this.props
    const { isOpen } = this.state

    return (
      <Popup
        basic
        trigger={this.renderTrigger()}
        content={this.renderDatePicker()}
        on='click'
        onOpen={this.onOpen}
        onClose={this.close}
        open={isOpen}
        position={position}
      />
    )
  }
}

SemanticDatePicker.propTypes = propTypes
SemanticDatePicker.defaultProps = defaultProps

export default SemanticDatePicker
