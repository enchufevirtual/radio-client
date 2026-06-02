import React from 'react';
import {
  ContainerNotFound,
  ButtonHome
} from './styles';
import { AlertMessage } from '../../components/alert';
import { Nav } from '../../components/nav';

export const NotFound = (): JSX.Element => {

  return (
    <>
      <Nav />
      <ContainerNotFound>
        <AlertMessage data={{id: 'notfound', message: 'Este contenido no está disponible en este momento'}} />
        <ButtonHome to='/'>Página Principal</ButtonHome>
      </ContainerNotFound>
    </>
  )
}
