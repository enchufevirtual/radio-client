import React from 'react';
import {
  ContainerNotFound,
  ButtonHome
} from './styles';
import { AlertMessage } from '../../components/alert';

export const NotFound = (): JSX.Element => {

  return (
    <ContainerNotFound >
      <AlertMessage data={{id: 'notfound', message: 'Este contenido no está disponible en este momento'}} />
      <ButtonHome to='/'>Página Principal</ButtonHome>
    </ContainerNotFound>
  )
}
