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

  const url = `${image
    ? `${process.env.BACKEND_URL}/${image}`
    : `https://api.multiavatar.com/${name}.svg`}`

  return (
    <ContainerStyle>
      { !matches ? <p>Bienvenid@, {auth.name}</p> : null }
      <img ref={imgRef} onClick={() => setMenuNav(!menuNav)} src={url} alt="user" />
      { menuNav && <MenuProfile setMenu={setMenuNav} imgRef={imgRef} /> }
    </ContainerStyle>
  )
}

export default ContainerNav
