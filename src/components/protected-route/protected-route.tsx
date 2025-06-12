import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchUser,
  selectIsAuthorization,
  selectIsAuthorited
} from '../../slices/sliceUser';
import { Navigate } from 'react-router';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const dispatch = useAppDispatch();
  const authorithation = useAppSelector(selectIsAuthorization);
  const authorithed = useAppSelector(selectIsAuthorited);

  useEffect(() => {
    console.log('<== check effect ==>');
    dispatch(fetchUser());
  }, []);

  if (authorithation) {
    return <Preloader />;
  }

  if (onlyUnAuth && authorithed) {
    return <Navigate replace to='/' />;
  }

  if (!onlyUnAuth && !authorithed) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
