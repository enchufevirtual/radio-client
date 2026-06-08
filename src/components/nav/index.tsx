import React, { lazy, Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import { Logo } from '../logo';
import { Header, ContainerLogoNav } from './styles';
import { useAuth } from '../../hooks/useAuth';

const ContainerNav = lazy(() => import('./ContainerNav'));
const ContainerButtons = lazy(() => import('./ContainerButtons'));

const pulse = keyframes`
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
`;

const SkeletonNav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  span,
  div {
    background: #4e5562;
    animation: ${pulse} 1.2s ease-in-out infinite;
  }

  div {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  span {
    display: block;
    width: 100px;
    height: 14px;
    border-radius: 999px;
  }
`;

export const Nav = (): JSX.Element => {

  const { auth, loading } = useAuth();

  return (
    <Header id="Header">
      <ContainerLogoNav >
        <Logo />
      </ContainerLogoNav>
        { loading ? (
          <SkeletonNav>
            <span />
            <div />
          </SkeletonNav>
        ) : auth?.id ? (
          <ContainerNav />
        ) : (
          <ContainerButtons />
        ) }
    </Header>
  );
}
