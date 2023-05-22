import React from 'react'
import { Anchors } from './styles'

type SocialTypes = {
  property: string,
  value: string
}

export const Social = ({property, value}: SocialTypes): JSX.Element => {
  return (
    <Anchors>
      <a href={`https://www.${property}.com/${value}`} target='_blank'>
        <i className={`fa fa-${property}`}></i>
      </a>
    </Anchors>
  )
}
