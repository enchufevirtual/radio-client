import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ContainerSettings, Nav, ContainerOutlet } from './styles';
import { useGlobal } from '../../hooks/useGlobal';

export const Settings = (): JSX.Element => {

  const { setIsFooter } = useGlobal();

  return (
    <ContainerSettings onLoad={() => setIsFooter(true)}>
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

