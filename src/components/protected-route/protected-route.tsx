import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchUser,
  selectIsAuthorization,
  selectIsAuthorited
} from '../../slices/sliceUser';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '@ui';
import { TWallPaperProps } from '@utils-types';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactNode;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children,
  wallpaper
}: ProtectedRouteProps & TWallPaperProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const authorithation = useAppSelector(selectIsAuthorization);
  const authorithed = useAppSelector(selectIsAuthorited);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (authorithation) {
    return wallpaper ? null : <Preloader />;
  }

  if (onlyUnAuth && authorithed) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !authorithed) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
