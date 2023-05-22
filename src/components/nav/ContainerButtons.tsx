import React from 'react';
import { ContainerButtonStyle, LinkRegisterButton, LinkLoginButton } from './styles';

const ContainerButtons = () => {
  return (
    <ContainerButtonStyle>
      <LinkLoginButton to='/login'>Entrar</LinkLoginButton>
      <LinkRegisterButton to='/register'>Registrarse</LinkRegisterButton>
    </ContainerButtonStyle>
  )
}

export default ContainerButtons
