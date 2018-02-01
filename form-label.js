import React from 'react'
import PropTypes from 'prop-types'

import { omit } from 'lodash'

import styles from './form-label.css'


const propTypes = { content: PropTypes.string.isRequired, large: PropTypes.bool }

const defaultProps = { large: false }

const FormLabel = (props) => {
  const className = props.large ? `${styles.label} ${styles.large}` : styles.label

  const labelProps = omit(props, 'large')

  return <label className={className} {...labelProps}>{props.content}:</label>
}

FormLabel.propTypes = propTypes

FormLabel.defaultProps = defaultProps

export default FormLabel
