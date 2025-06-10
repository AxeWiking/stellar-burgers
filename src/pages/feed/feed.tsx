import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { AppDispatch, RootState } from '../../services/store';
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
import { useSelector, useDispatch } from 'react-redux';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchFeeds());
    dispatch(fetchIngredients());
  }, []);

  const isIngradientsLoaded = useSelector<RootState, boolean>(
    selectIsIngredientsLoaded
  );
  const isFeedsLoaded = useSelector<RootState, boolean>(selectFeedsLoaded);
  const isFeedsLoading = useSelector<RootState, boolean>(selectFeedsLoading);
  const orders: TOrder[] = useSelector(selectFeeds) || [];

  if (!isFeedsLoaded || !isIngradientsLoaded || isFeedsLoading) {
    return <Preloader />;
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
