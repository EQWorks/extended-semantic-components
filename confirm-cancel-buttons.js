import React from 'react'

import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'


const propTypes = {
  confirmClick: PropTypes.func.isRequired,
  cancelClick: PropTypes.func.isRequired,
  confirmContent: PropTypes.string.isRequired,
  cancelContent: PropTypes.string,
  disabled: PropTypes.bool,
  floated: PropTypes.string,
  className: PropTypes.string,
}

const defaultProps = {
  disabled: false,
  cancelContent: 'Cancel',
  floated: null,
  className: null,
}

const ConfirmCancelButtons = ({
  confirmClick,
  cancelClick,
  confirmContent,
  cancelContent,
  disabled,
  floated,
  className,
}) => (
  <Button.Group floated={floated} className={className}>
    <Button onClick={cancelClick} content={cancelContent} />
    <Button primary onClick={confirmClick} content={confirmContent} disabled={disabled} />
  </Button.Group>
)

ConfirmCancelButtons.propTypes = propTypes

ConfirmCancelButtons.defaultProps = defaultProps

export default ConfirmCancelButtons
