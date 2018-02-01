import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Popup, Label } from 'semantic-ui-react'
import moment from 'moment-timezone'
import { DayPickerRangeController } from 'react-dates'

import { DEFAULT_TZ, formatDateToLocale } from '../utils/time'
import styles from './semantic-date-picker.css'


const propTypes = {
  endDate: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  onSelection: PropTypes.func.isRequired,
  blockedEnd: PropTypes.string,
  blockedStart: PropTypes.string,
  endDateOnly: PropTypes.bool,
  labelProps: PropTypes.object,
  numberOfMonths: PropTypes.number,
  position: PropTypes.string,
  keepOpenOnSelection: PropTypes.bool,
  keepDatesOnOpen: PropTypes.bool,
}

const defaultProps = {
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

    this.state = {
      focusedInput: null,
      isOpen: false,
      startDate: moment(props.startDate).tz(DEFAULT_TZ),
      endDate: moment(props.endDate).tz(DEFAULT_TZ),
    }
  }

  open = () => {
    this.setState({ isOpen: true })

    if (!this.props.keepDatesOnOpen) {
      this.setState({ endDate: null })
      if (!this.props.endDateOnly) {
        this.setState({ startDate: null })
      }
    }
  }

  close = () => {
    this.setState({
      isOpen: false,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
    })
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

    const durationString = startDate ?
      `${(startDateString)} \u2192 ${endDateString}` :
      'Select a Date Range'

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
    if (!(endDate === null || endDate.isSame(this.state.endDate))) {
      if (!this.props.keepOpenOnSelection) {
        this.close()
      }
      this.props.onSelection({ startDate, endDate })
    }

    this.setState({ startDate, endDate })
  }

  renderDatePicker() {
    const { focusedInput, startDate, endDate } = this.state
    const {
      numberOfMonths,
      endDateOnly,
      blockedEnd,
      blockedStart,
    } = this.props

    const momentStartDate = startDate ? moment(startDate).tz(DEFAULT_TZ) : null
    const momentEndDate = endDate ? moment(endDate).tz(DEFAULT_TZ) : null
    const isOutsideRange = (day) => {
      let blocked = false
      if (endDateOnly) {
        blocked = day < momentStartDate || blocked
      }

      if (blockedStart) {
        blocked = day < moment(blockedStart) || blocked
      }

      if (blockedEnd) {
        blocked = day > moment(blockedEnd) || blocked
      }

      return blocked
    }

    const initialMonth = startDate || blockedStart

    return (
      <div className='semanticCalendar'>
        <DayPickerRangeController
          startDate={momentStartDate}
          endDate={momentEndDate}
          onDatesChange={this.onDatesChange}
          focusedInput={focusedInput}
          onFocusChange={this.onFocusChange}
          numberOfMonths={numberOfMonths}
          isOutsideRange={isOutsideRange}
          hideKeyboardShortcutsPanel
          initialVisibleMonth={initialMonth ? () => moment(initialMonth) : null}
          minimumNights={0}
        />
      </div>
    )
  }

  render() {
    const { position } = this.props

    return (
      <Popup
        basic
        trigger={this.renderTrigger()}
        content={this.renderDatePicker()}
        on='click'
        onOpen={this.onOpen}
        onClose={this.close}
        open={this.state.isOpen}
        position={position}
      />
    )
  }
}

SemanticDatePicker.propTypes = propTypes
SemanticDatePicker.defaultProps = defaultProps

export default SemanticDatePicker
