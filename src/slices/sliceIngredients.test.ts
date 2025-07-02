import { expect, test } from '@jest/globals';
import { reducer, fetchIngredients } from './sliceIngredients';
import { configureStore } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import * as api from '../utils/burger-api';
import * as constant from '../constants/constants';
import { initialStateIngredients } from '../slices/sliceIngredients';

const mockIngredients: TIngredient[] = [
  constant.cratorBun,
  constant.biococlet,
  constant.tetraFillets,
  constant.spicySauce
];

describe('тестируем редьюсер загрузки ингредиентов', () => {
  test('тестируем запрос', () => {
    const state = reducer(
      initialStateIngredients,
      fetchIngredients.pending('')
    );
    expect(state).toEqual({ ...initialStateIngredients, isLoading: true });
  });

  test('тестируем успешный асинхронный запрос', async () => {
    const mock = jest
      .spyOn(api, 'getIngredientsApi')
      .mockImplementation(
        (): Promise<TIngredient[]> => Promise.resolve(mockIngredients)
      );

    const store = configureStore({
      reducer: reducer,
      preloadedState: initialStateIngredients
    });
    expect(store.getState().lastError).toBeNull();

    const call = store.dispatch(fetchIngredients());
    expect(store.getState().isLoading).toEqual(true);

    await call;
    expect(mock).toHaveBeenCalledTimes(1);
    expect(store.getState().isLoading).toEqual(false);

    const ingredients = store.getState().ingredients;
    expect(ingredients).toEqual(mockIngredients);
    expect(store.getState().lastError).toBeNull();

    mock.mockRestore();
  });

  test('тестируем неудачный асинхронный запрос', async () => {
    const mock = jest
      .spyOn(api, 'getIngredientsApi')
      .mockImplementation((): Promise<TIngredient[]> => Promise.reject());

    const store = configureStore({
      reducer: reducer,
      preloadedState: {
        ...initialStateIngredients,
        ingredients: mockIngredients
      }
    });
    expect(store.getState().lastError).toBeNull();

    const call = store.dispatch(fetchIngredients());
    expect(store.getState().isLoading).toEqual(true);

    await call;
    expect(mock).toHaveBeenCalledTimes(1);
    expect(store.getState().isLoading).toEqual(false);

    const ingredients = store.getState().ingredients;
    expect(ingredients).toEqual(mockIngredients);
    expect(store.getState().lastError).not.toBeNull();

    mock.mockRestore();
  });
});
