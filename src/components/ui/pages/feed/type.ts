import { TIngredient, TOrder } from '@utils-types';

export type FeedUIProps = {
  orders: TOrder[];
  ingredients: TIngredient[];
  handleGetFeeds: () => void;
};
