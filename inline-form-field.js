import React from 'react'
import PropTypes from 'prop-types'

import { Form } from 'semantic-ui-react'

import FormLabel from './form-label'
import ErrorText from './error-text'
import styles from './inline-form-field.css'


const propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  infoText: PropTypes.string,
  width: PropTypes.number,
  large: PropTypes.bool,
}

const defaultProps = {
  errorText: '',
  infoText: '',
  width: null,
  large: false,
}

const InlineFormField = ({ children, label, errorText, infoText, width, large }) => (
  <div>
    <Form.Field
      inline
      error={errorText !== ''}
      className={styles.form}
      width={width}
    >
      {<FormLabel content={label} htmlFor={label} large={large} />}
      <div className={styles.children}>
        {children}
      </div>
    </Form.Field>
    <div style={{ marginLeft: '9rem' }}>
      <ErrorText errorText={errorText} />
    </div>
    {errorText === '' &&
      <div className={styles.info}>
        {infoText}
      </div>
    }
  </div>
)

InlineFormField.propTypes = propTypes

InlineFormField.defaultProps = defaultProps

export default InlineFormField
