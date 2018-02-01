import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'semantic-ui-react'

import styles from './error-text.css'


const propTypes = { errorText: PropTypes.string }

const defaultProps = { errorText: '' }

const ErrorText = ({ errorText }) => {
  if (errorText !== '') {
    return (
      <div className={styles.error}>
        <Icon name='warning sign' />{errorText}
      </div>
    )
  }
  return null
}

ErrorText.propTypes = propTypes

ErrorText.defaultProps = defaultProps

export default ErrorText
