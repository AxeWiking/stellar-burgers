import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder, TWallPaperProps } from '@utils-types';
import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchFeeds,
  selectFeedsLoaded,
  selectFeedsLoading,
  selectFeeds
} from '../../slices/sliceFeeds';
import {
  fetchIngredients,
  selectIsIngredientsLoaded
} from '../../slices/sliceIngredients';

export const Feed: FC<TWallPaperProps> = ({ wallpaper }: TWallPaperProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFeeds());
    dispatch(fetchIngredients());
  }, []);

  const isIngradientsLoaded = useAppSelector(selectIsIngredientsLoaded);
  const isFeedsLoaded = useAppSelector(selectFeedsLoaded);
  const isFeedsLoading = useAppSelector(selectFeedsLoading);
  const orders: TOrder[] = useAppSelector(selectFeeds) || [];

  if (!isFeedsLoaded || !isIngradientsLoaded || isFeedsLoading) {
    return wallpaper ? null : <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};
