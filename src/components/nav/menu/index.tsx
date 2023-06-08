import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavStyle } from '../styles';
import { MenuProfileProps } from 'types/types';
import { useAuth } from '../../../hooks/useAuth';

export const MenuProfile = ({setMenu, imgRef}: MenuProfileProps): JSX.Element => {

  const { logOut, auth } = useAuth();
  const menuRef = useRef(null);

  useEffect(() => {
    function menuOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Element) &&
        imgRef.current &&
        !imgRef.current.contains(event.target as Element)
      ) {
        setMenu(false);
      }
    }
    document.addEventListener('mousedown', menuOutside);

    return () => {
      document.removeEventListener('mousedown', menuOutside);
    }
  }, [menuRef]);

  return (
    <NavStyle ref={menuRef}>
      <Link
        to={`/${auth.username ?? auth.name.replace(" ", "-") + "-" + auth.id}`}
      >
        Perfil
      </Link>
      <Link
        to='/settings'
      >
        Editar Perfil
      </Link>
      <button aria-label='logout' type='button' onClick={logOut}>Cerrar Sesión</button>
    </NavStyle>
  )
}
