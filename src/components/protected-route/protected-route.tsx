import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import {
  selectIsAuthorization,
  selectIsAuthorited
} from '../../slices/sliceUser';
import { Navigate } from 'react-router';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  passUnAuth?: boolean;
  children: ReactNode;
};

export const ProtectedRoute = ({
  passUnAuth,
  children
}: ProtectedRouteProps) => {
  const authorithation = useSelector(selectIsAuthorization);
  const authorithed = useSelector(selectIsAuthorited);

  if (authorithation) {
    return <Preloader />;
  }

  if (!passUnAuth && !authorithed) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
