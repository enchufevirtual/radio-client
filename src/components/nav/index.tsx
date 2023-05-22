import React, { lazy, Suspense } from 'react';
import { Logo } from '../logo';
import { Header, ContainerLogoNav } from './styles';
import { useAuth } from '../../hooks/useAuth';

const ContainerNav = lazy(() => import('./ContainerNav'));
const ContainerButtons = lazy(() => import('./ContainerButtons'));

export const Nav = (): JSX.Element => {

  const { auth } = useAuth();

  return (
    <Header id="Header">
      <ContainerLogoNav >
        <Logo />
      </ContainerLogoNav>
      <Suspense fallback={<div>Loading...</div>}>
        { auth?.id ? <ContainerNav /> : <ContainerButtons /> }
      </Suspense>
    </Header>
  );
}
