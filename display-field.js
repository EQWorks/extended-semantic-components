import React from 'react'

import PropTypes from 'prop-types'
import styles from './display-field.css'


const DisplayField = ({ header, content }) => (
  <div>
    <span className={styles.label}>
      {header}:
    </span>
    <span className={styles.content}>
      {content}
    </span>
  </div>
)

DisplayField.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
}

export default DisplayField
