import React from 'react';
import { LoadingStyles, Container } from './styles';

export const Loading = (): JSX.Element => {
  return (
    <LoadingStyles>
      <Container>
        <div></div>
        <div></div>
        <div></div>
      </Container>
    </LoadingStyles>
  )
}
