import React from 'react';
import { ContainerButtonStyle, LinkRegisterButton, LinkLoginButton } from './styles';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const ContainerButtons = () => {

  const match = useMediaQuery('(min-width: 330px)')

  return (
    <ContainerButtonStyle>
      <LinkLoginButton to='/login'>Entrar</LinkLoginButton>
      {match && <LinkRegisterButton to='/register'>Registrarse</LinkRegisterButton>}
    </ContainerButtonStyle>
  )
}

export default ContainerButtons
