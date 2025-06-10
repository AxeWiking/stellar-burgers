import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { sliceUser } from '../slices/sliceUser';
import { sliceDesigner } from '../slices/sliceDesigner';
import { sliceIngredients } from '../slices/sliceIngredients';
import { sliceFeeds } from '../slices/sliceFeeds';
import { sliceOrder } from '../slices/sliceOrder';
import { sliceOrderCard } from '../slices/sliceOrderCard';
//import { stat } from 'fs';

const rootReducer = combineSlices(
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

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
