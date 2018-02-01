

import React from 'react'

import PropTypes from 'prop-types'
import { Label, Select } from 'semantic-ui-react'
import styles from './labeled-selection.css'


const propTypes = {
  label: PropTypes.object,
  className: PropTypes.string,
}

const defaultProps = {
  label: {},
  className: '',
}

const LabeledSelection = (props) => {
  const { label } = props

  return (
    <div className={styles.container}>
      <Label className={`${styles.leftLabel} ${{ ...label }}`} />
      <Select {...props} className={`${props.className} ${styles.rightSelect}`} />
    </div>
  )
}

LabeledSelection.propTypes = propTypes
LabeledSelection.defaultProps = defaultProps

export default LabeledSelection
