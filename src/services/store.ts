import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { sliceUser } from '../slices/sliceUser';
import { sliceDesigner } from '../slices/sliceDesigner';
import { sliceIngredients } from '../slices/sliceIngredients';
import { sliceFeeds } from '../slices/sliceFeeds';
import { sliceOrder } from '../slices/sliceOrder';
import { sliceOrderCard } from '../slices/sliceOrderCard';

export const rootReducer = combineSlices(
  sliceUser,
  sliceIngredients,
  sliceDesigner,
  sliceFeeds,
  sliceOrder,
  sliceOrderCard
);
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = dispatchHook.withTypes<AppDispatch>();
export const useAppSelector = selectorHook.withTypes<RootState>();

export default store;
