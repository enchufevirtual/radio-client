import React, { useRef, useState } from 'react';
import { MenuProfile } from './menu';
import { ContainerStyle } from './styles';
import { useAuth } from '../../hooks/useAuth';
import { useGlobal } from '../../hooks/useGlobal';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const ContainerNav = (): JSX.Element => {

  const matches = useMediaQuery("(max-width: 350px)");

  const { auth } = useAuth();
  const { image, name } = auth;
  const { setMenuNav, menuNav } = useGlobal();
  const imgRef = useRef(null);
  const truncatedName = name.length > 10 ? name.slice(0, 10) + '...' : name;

  const api = process.env.API_AVATAR;
  const key = process.env.API_KEY;

  const url = `${image
    ? `${process.env.BACKEND_URL}/${image}`
    : `${api}/${name}.png?apikey=${key}`}`

  return (
    <ContainerStyle>
      { !matches ? <p>Bienvenid@, {truncatedName}</p> : null }
      <img ref={imgRef} onClick={() => setMenuNav(!menuNav)} src={url} alt="user" />
      { menuNav && <MenuProfile setMenu={setMenuNav} imgRef={imgRef} /> }
    </ContainerStyle>
  )
}

export default ContainerNav
