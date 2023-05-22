import React, { useRef, useState } from 'react';
import { MenuProfile } from './menu';
import { ContainerStyle } from './styles';
import { useAuth } from '../../hooks/useAuth';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const ContainerNav = (): JSX.Element => {

  const matches = useMediaQuery("(max-width: 350px)");

  const [menu, setMenu] = useState(false);
  const { auth } = useAuth();
  const imgRef = useRef(null);

  const url = `${process.env.BACKEND_URL}/${auth.image ?? 'avatar.jpg'}`

  return (
    <ContainerStyle>
      { !matches ? <p>Bienvenid@, {auth.name}</p> : null }
      <img ref={imgRef} onClick={() => setMenu(!menu)} src={url} alt="user" />
      { menu && <MenuProfile setMenu={setMenu} imgRef={imgRef} /> }
    </ContainerStyle>
  )
}

export default ContainerNav
