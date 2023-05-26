import React from 'react';
import type { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'
import { Loading } from '../loading/Loading';

interface ProtectedRouteProps {
  roles: string[];
  children?: ReactNode;
}

export const ProtectedRoute = ({ roles, children }: ProtectedRouteProps): JSX.Element => {

  const { auth, loading } = useAuth();

  if (loading) return <Loading />

  if (!auth?.id || !roles.includes(auth?.role)) {
    return <Navigate to='/' />
  }

  return children ? <>{children}</> : <Outlet />
}
