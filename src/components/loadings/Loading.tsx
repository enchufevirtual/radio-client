import React from 'react';
import { LoadingStyles, Container } from './styles';
import { useGlobal } from '../../hooks/useGlobal';


export const Loading = (): JSX.Element => {

  const { zIndexLoading } = useGlobal();

  return (
    <LoadingStyles zIndex={zIndexLoading}>
      <Container>
        <div></div>
        <div></div>
        <div></div>
      </Container>
    </LoadingStyles>
  )
}
