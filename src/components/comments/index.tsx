import React from 'react';
import { ContainerButtonComments } from './styles';

export const Comments = (): JSX.Element => {
  return (
    <ContainerButtonComments>
      <button>Reaccionar</button>
      <button>Comentar</button>
      <button>Compartir</button>
    </ContainerButtonComments>
  )
}
