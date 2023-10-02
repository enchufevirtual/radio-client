import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NavStyle } from '../styles';
import { MenuProfileProps } from 'types/types';
import { useAuth } from '../../../hooks/useAuth';
import { useGlobal } from '../../../../src/hooks/useGlobal';
import { MENU_NAV } from '../../../../src/context/constants';

export const MenuProfile = ({imgRef}: MenuProfileProps): JSX.Element => {

  const { dispatch } = useGlobal();
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
        dispatch({type: MENU_NAV, payload: false})
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
