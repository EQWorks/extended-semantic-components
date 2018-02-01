

import React from 'react'

import PropTypes from 'prop-types'
import { Label } from 'semantic-ui-react'
import styles from './attached-labels.css'


const propTypes = {
  leftLabel: PropTypes.object.isRequired,
  rightLabel: PropTypes.object.isRequired,
}

const AttachedLabels = ({ leftLabel, rightLabel }) => (
  <div>
    <Label {...leftLabel} className={`${leftLabel.className} ${styles.left}`} />
    <Label {...rightLabel} className={`${rightLabel.className} ${styles.right}`} />
  </div>
)

AttachedLabels.propTypes = propTypes

export default AttachedLabels
