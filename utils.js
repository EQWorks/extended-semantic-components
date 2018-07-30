import React from 'react'
import { Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export const render = (Component, content='') => (
  <div style={{ margin: '40px', width: '90%' }}>
    <Message content={content} />
    {Component}
  </div>
)
