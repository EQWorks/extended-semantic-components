import React from 'react'

import PropTypes from 'prop-types'
import { Label } from 'semantic-ui-react'

import { DEFAULT_TZ } from '../utils/time'
import getStatus from '../utils/get-status'
import styles from './status-label.css'


const StatusLabel = ({ Draft, Enabled, StartDate, EndDate, TimeZone, className }) => {
  const { color, status } = getStatus({ Draft, Enabled, StartDate, EndDate, TimeZone })

  return (
    <div className={className}>
      <Label className={styles.circle} circular color={color} empty key={color} />
      {status}
    </div>
  )
}

StatusLabel.propTypes = {
  Enabled: PropTypes.bool.isRequired,
  StartDate: PropTypes.string.isRequired,
  EndDate: PropTypes.string.isRequired,
  TimeZone: PropTypes.string,
  Draft: PropTypes.bool,
  className: PropTypes.string,
}

StatusLabel.defaultProps = {
  TimeZone: DEFAULT_TZ,
  className: '',
  Draft: false,
}

export default StatusLabel
