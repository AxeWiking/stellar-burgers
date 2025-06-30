import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchOrders, selectOrders } from '../../slices/sliceUser';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { Preloader } from '@ui';
import { TWallPaperProps } from '@utils-types';
import {
  fetchIngredients,
  selectIngredients
} from '../../slices/sliceIngredients';

export const ProfileOrders: FC<TWallPaperProps> = ({
  wallpaper
}: TWallPaperProps) => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const ingredients = useAppSelector(selectIngredients);

  useEffect(() => {
    console.log('fetch orders and ingredients', orders);
    dispatch(fetchOrders());
    dispatch(fetchIngredients());
  }, []);

  if (!orders || !ingredients) {
    return wallpaper ? null : <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} ingredients={ingredients} />;
};
