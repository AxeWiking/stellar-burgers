import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useAppDispatch } from '../../services/store';
import { performLogoutUser } from '../../slices/sliceUser';

export const ProfileMenu: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(performLogoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
