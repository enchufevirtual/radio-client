import React from 'react';
import { ContainerButtonStyle, LinkRegisterButton, LinkLoginButton } from './styles';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const ContainerButtons = () => {

  const match = useMediaQuery('(min-width: 330px)')

  return (
    <ContainerButtonStyle>
      <LinkLoginButton aria-label='Entrar' to='/login'>Entrar</LinkLoginButton>
      {match && <LinkRegisterButton aria-label='Registrarse' to='/register'>Registrarse</LinkRegisterButton>}
    </ContainerButtonStyle>
  )
}

export default ContainerButtons
