import React from 'react'
import { Alert } from './styles'

type  Data = {
  data: {
    id: string,
    success?: boolean
  }
}

export const AlertMessage = ({data}: Data): JSX.Element => {
  return (
    <Alert id='alert' success={data.success}>
      <i id={`${data.id}-icon`}></i>
      <span id={`${data.id}-alert`}></span>
    </Alert>
  )
}
