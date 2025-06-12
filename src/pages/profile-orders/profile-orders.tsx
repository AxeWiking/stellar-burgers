import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchOrders, selectOrders } from '../../slices/sliceUser';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { Preloader } from '@ui';
import { TWallPaperProps } from '@utils-types';

export const ProfileOrders: FC<TWallPaperProps> = ({
  wallpaper
}: TWallPaperProps) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  if (!orders) {
    return wallpaper ? null : <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
