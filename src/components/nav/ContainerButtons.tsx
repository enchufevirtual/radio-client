import React from 'react';
import { ContainerButtonStyle, LinkRegisterButton, LinkLoginButton } from './styles';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useGlobal } from '../../../src/hooks/useGlobal';
import { IS_PLAYING, PLAY } from '../../../src/context/constants';

const ContainerButtons = () => {

  const { dispatch } = useGlobal();

  const match = useMediaQuery('(min-width: 330px)');

  const handleIsPlaying = () => {
    dispatch({type: PLAY, payload: false});
    dispatch({type: IS_PLAYING, payload: false});
  }

  return (
    <ContainerButtonStyle>
      <LinkLoginButton onClick={handleIsPlaying} aria-label='Entrar' to='/login'>Entrar</LinkLoginButton>
      {match && <LinkRegisterButton onClick={handleIsPlaying} aria-label='Registrarse' to='/register'>Registrarse</LinkRegisterButton>}
    </ContainerButtonStyle>
  )
}

export default ContainerButtons
