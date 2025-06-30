import { expect, test } from '@jest/globals';
import { initialStateUser } from '../slices/sliceUser';
import { initialStateIngredients } from '../slices/sliceIngredients';
import { initialStateDesigner } from '../slices/sliceDesigner';
import { initialStateFeeds } from '../slices/sliceFeeds';
import { initialStateOrder } from '../slices/sliceOrder';
import { initialStateOrderCard } from '../slices/sliceOrderCard';
import store, { rootReducer } from './store';
import { createAction } from '@reduxjs/toolkit';

describe('тестируем корневой редьюсер', () => {
  const initialState = {
    user: initialStateUser,
    ingredients: initialStateIngredients,
    designer: initialStateDesigner,
    feeds: initialStateFeeds,
    order: initialStateOrder,
    orderCard: initialStateOrderCard
  };

  const unknownAction = createAction('unknown_action');

  test('тестируем начальное состояние', async () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('тестируем корневой редюсер после неизвестной акции', () => {
    const state = rootReducer(initialState, unknownAction());
    expect(state).toEqual(initialState);
  });

  test('тестируем корневой редюсер c неопределенным начальным состоянием', () => {
    const state = rootReducer(undefined, unknownAction());
    expect(state).toEqual(initialState);
  });
});
