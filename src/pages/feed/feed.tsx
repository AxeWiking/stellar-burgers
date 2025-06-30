import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder, TWallPaperProps } from '@utils-types';
import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchFeeds,
  selectFeedsLoading,
  selectFeeds
} from '../../slices/sliceFeeds';
import {
  fetchIngredients,
  selectIngredients,
  selectIsIngredientsLoading
} from '../../slices/sliceIngredients';

export const Feed: FC<TWallPaperProps> = ({ wallpaper }: TWallPaperProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFeeds());
    dispatch(fetchIngredients());
  }, []);

  const orders = useAppSelector(selectFeeds);
  const isFeedsLoading = useAppSelector(selectFeedsLoading);

  const ingredients = useAppSelector(selectIngredients);
  const isIngredientsLoading = useAppSelector(selectIsIngredientsLoading);

  if (!orders || !ingredients || isFeedsLoading || isIngredientsLoading) {
    return wallpaper ? null : <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      ingredients={ingredients}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};
