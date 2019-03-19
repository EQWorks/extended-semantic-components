import 'semantic-ui-css/semantic.min.css'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Dropzone } from '../src'

storiesOf('Dropzone', module)
  .add('Default', () => (
    <div style={{ margin: '2rem' }}>
      <Dropzone
        onDrop={action('handleFileDrop')}
      />
    </div>
  ))
  .add('Image file type', () => (
    <div style={{ margin: '2rem' }}>
      <Dropzone
        onDrop={action('handleFileDrop')}
        accept='image/*'
      />
    </div>
  ))
  .add('Custom message for CSV', () => (
    <div style={{ margin: '2rem' }}>
      <Dropzone
        onDrop={action('handleFileDrop')}
        accept='.csv, text/csv, application/vnd.ms-excel'
        defaultMsg='Drop your file here'
        activeMsg='I see you are trying to drop something'
        rejectMsg='Invalid file type'
        note='Only CSV files are allowed'
      />
    </div>
  ))
  .add('Template preview', () => (
    <div style={{ margin: '2rem' }}>
      <Dropzone
        onDrop={action('handleFileDrop')}
        accept='image/*'
        initWithPreview
        renderPreview={(acceptedFiles) => (
          <div>
            <img
              src={
                acceptedFiles.length === 0
                ?
                'https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png'
                :
                URL.createObjectURL(acceptedFiles[0])}
              style={{ width: '400px' }}
            />
          </div>
        )}
      />
    </div>
  ))
