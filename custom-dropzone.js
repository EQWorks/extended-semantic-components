import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Dropzone from 'react-dropzone'

import styles from './custom-dropzone.css'


const propTypes = {
  multiple: PropTypes.bool,
  handleFileUpload: PropTypes.func.isRequired,
  hasFile: PropTypes.bool.isRequired,
  // file type filter for system's filepicker
  filePickerType: PropTypes.string,
  getDropzonePreview: PropTypes.func,
  note: PropTypes.string.isRequired,
}

const defaultProps = {
  multiple: false,
  getDropzonePreview: null,
  filePickerType: null,
}

class CustomDropzone extends Component {
  renderDropZone = ({ isDragActive, isDragReject, acceptedFiles }) => {
    const {
      getDropzonePreview,
      note,
      hasFile,
    } = this.props

    if (acceptedFiles.length && hasFile) {
      return getDropzonePreview ? getDropzonePreview(acceptedFiles) : acceptedFiles[0].name
    }

    let dropzoneDesc
    if (isDragReject) {
      dropzoneDesc = 'This File Is Not Authorized'
    } else if (isDragActive) {
      dropzoneDesc = 'This File Is Authorized'
    } else {
      dropzoneDesc = 'Drop File Here or Click to Upload'
    }

    return (
      <div className={styles.dropzoneDesc}>
        {dropzoneDesc}
        <p className={styles.dropzoneNote}>
          {note}
        </p>
      </div>
    )
  }

  render() {
    const {
      multiple,
      handleFileUpload,
      filePickerType,
    } = this.props

    return (
      <Dropzone
        multiple={multiple}
        onDrop={handleFileUpload}
        className={styles.dropzone}
        activeClassName={styles.dropzoneActive}
        rejectClassName={styles.dropzoneReject}
        accept={filePickerType}
      >
        {this.renderDropZone}
      </Dropzone>
    )
  }
}

CustomDropzone.propTypes = propTypes

CustomDropzone.defaultProps = defaultProps

export default CustomDropzone
