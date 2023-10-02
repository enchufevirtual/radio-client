import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ContainerSettings, Nav, ContainerOutlet } from './styles';
import { useGlobal } from '../../hooks/useGlobal';
import { IS_FOOTER } from '../../../src/context/constants';

export const Settings = (): JSX.Element => {

  const { dispatch } = useGlobal();

  const handleFooter = () => {
    dispatch({type: IS_FOOTER, payload: true})
  }

  return (
    <ContainerSettings onLoad={handleFooter}>
      <Nav>
        <Link to="/settings/profile"><i className='fas fa-user'></i>Perfil Público</Link>
        <Link to="/settings/security"><i className='fas fa-edit'></i>Contraseña</Link>
      </Nav>
      <ContainerOutlet>
        <Outlet />
      </ContainerOutlet>
    </ContainerSettings>
  )
}

