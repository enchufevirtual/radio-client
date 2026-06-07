import React, { useRef } from 'react';
import { MenuProfile } from './menu';
import { ContainerStyle } from './styles';
import { useAuth } from '../../hooks/useAuth';
import { useGlobal } from '../../hooks/useGlobal';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { MENU_NAV } from '../../../src/context/constants';import { getAvatarUrl } from '../../helpers/getAvatarUrl';
const ContainerNav = (): JSX.Element => {

  const matches = useMediaQuery("(max-width: 350px)");

  const { auth } = useAuth();
  const { image, username, name } = auth;
  const { dispatch, menuNav } = useGlobal();
  const imgRef = useRef(null);
  const truncatedName = name.length > 30 ? name.slice(0, 30) + '...' : name;

  const url = getAvatarUrl(image, username);

  const handleMenu = () => {
    dispatch({type: MENU_NAV, payload: !menuNav});
  }

  return (
    <ContainerStyle>
      { !matches ? <p>{truncatedName}</p> : null }
      <img ref={imgRef} onClick={handleMenu} src={url} alt="user" />
      { menuNav && <MenuProfile imgRef={imgRef} /> }
    </ContainerStyle>
  )
}

export default ContainerNav
