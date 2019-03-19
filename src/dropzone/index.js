import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'


const propTypes = {
  /* core */
  /** File upload handler */
  onDrop: PropTypes.func.isRequired,
  /**
  A comma-separated list of unique content type specifiers,
  For example: .jpg, .png, .doc, .csv, .pdf, image/*, video/*, audio/*
  See more in https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
  */
  accept: PropTypes.string,

  /* file preview */
  /** renderPreview(acceptedFiles) */
  renderPreview: PropTypes.func,
  /** if true, use renderPreview for init rendering */
  initWithPreview: PropTypes.bool,

  /* custom message */
  defaultMsg: PropTypes.string,
  activeMsg: PropTypes.string,
  rejectMsg: PropTypes.string,
  note: PropTypes.string,
}

const defaultProps = {
  renderPreview: null,
  accept: null,
  initWithPreview: false,
  defaultMsg: 'Drop File Here or Click to Upload',
  activeMsg: 'This File Is Authorized',
  rejectMsg: 'This File Is Not Authorized',
  note: '',
}

const Dropzone = ({
  onDrop: customOnDrop,
  accept,
  renderPreview, initWithPreview,
  defaultMsg, activeMsg, rejectMsg, note,
}) => {
  const onDrop = useCallback(customOnDrop, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ onDrop, accept })

  const renderChildren = () => {
    if (initWithPreview || acceptedFiles.length) {
      return renderPreview ? renderPreview(acceptedFiles) : (
        acceptedFiles.map((f, i) => <div key={`${i}_${f.name}`}>{f.name}</div>)
      )
    }

    let desc
    if (isDragReject) {
      desc = rejectMsg
    } else if (isDragActive) {
      desc = activeMsg
    } else {
      desc = defaultMsg
    }

    return (
      <DropzoneDescDiv>
        {desc}
        <DropzoneNoteDiv>
          {note}
        </DropzoneNoteDiv>
      </DropzoneDescDiv>
    )
  }

  return (
    <StyledDropzone {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      {renderChildren()}
    </StyledDropzone>
  )
}

/* Styles */
const getBorderColor = (props) => {
  if (props.isDragReject) {
    return 'rgb(204, 102, 102)'
  }
  if (props.isDragAccept || props.isDragActive) {
    return 'rgb(102, 204, 102)'
  }
  return 'rgb(102, 102, 102)'
}

const StyledDropzone = styled.div`
  width: 100%;
  padding: 3.5rem 3.5rem;
  border-width: 1px;
  border-color: ${props => getBorderColor(props)};
  border-style: ${props => props.isDragActive ? 'solid' : 'dashed'};
  background-color: ${props => props.isDragActive ? 'rgb(238, 238, 238)' : ''};
  border-radius: 5px;
`

const DropzoneDescDiv = styled.h1`
  margin: 40px 0px !important;
  font-size: 20px;
  text-align: center;
  color: #646C7F;
  font-weight: 800;
`

const DropzoneNoteDiv = styled.p`
  margin-top: 1.5rem !important;
  font-weight: 100;
  font-size: 16px;
`

Dropzone.propTypes = propTypes
Dropzone.defaultProps = defaultProps

export default Dropzone
