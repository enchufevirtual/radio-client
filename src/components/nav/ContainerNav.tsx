import React, { useRef, useState } from 'react';
import { MenuProfile } from './menu';
import { ContainerStyle } from './styles';
import { useAuth } from '../../hooks/useAuth';
import { useGlobal } from '../../hooks/useGlobal';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { MENU_NAV } from '../../../src/context/constants';

const ContainerNav = (): JSX.Element => {

  const matches = useMediaQuery("(max-width: 350px)");

  const { auth } = useAuth();
  const { image, name } = auth;
  const { dispatch, menuNav } = useGlobal();
  const imgRef = useRef(null);
  const truncatedName = name.length > 10 ? name.slice(0, 10) + '...' : name;

  const api = process.env.API_AVATAR;
  const key = process.env.API_KEY;

  const url = `${image
    ? `${process.env.BACKEND_URL}/${image}`
    : `${api}/${name}.png?apikey=${key}`}`

  const handleMenu = () => {
    dispatch({type: MENU_NAV, payload: !menuNav});
  }

  return (
    <ContainerStyle>
      { !matches ? <p>Bienvenid@, {truncatedName}</p> : null }
      <img ref={imgRef} onClick={handleMenu} src={url} alt="user" />
      { menuNav && <MenuProfile imgRef={imgRef} /> }
    </ContainerStyle>
  )
}

export default ContainerNav
