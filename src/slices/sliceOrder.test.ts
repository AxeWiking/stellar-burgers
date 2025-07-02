import { expect, test } from '@jest/globals';
import {
  initialStateOrder,
  reducer,
  performOrder,
  confirmOrder,
  clearOrder
} from './sliceOrder';
import * as constant from '../constants/constants';

describe('тестируем редьюсер отправки заказа', () => {
  test('подтверждение заказа', () => {
    const state = reducer(initialStateOrder, confirmOrder());
    expect(state.isOrderConfirmed).toBe(true);
    expect(state.isOrderRequested).toBe(false);
    expect(state.completed).toBeNull();
  });

  test('запрос на выполнение заказа', () => {
    const state = reducer(
      {
        isOrderConfirmed: true,
        isOrderRequested: false,
        completed: null
      },
      performOrder.pending('', constant.mockOrderOne.ingredients)
    );
    expect(state.isOrderConfirmed).toBe(false);
    expect(state.isOrderRequested).toBe(true);
    expect(state.completed).toBeNull();
  });

  test('неудачный запрос на выполнение заказа', () => {
    const state = reducer(
      {
        isOrderConfirmed: false,
        isOrderRequested: true,
        completed: null
      },
      performOrder.rejected(
        new Error('check'),
        '',
        constant.mockOrderOne.ingredients
      )
    );
    expect(state.isOrderConfirmed).toBe(false);
    expect(state.isOrderRequested).toBe(false);
    expect(state.completed).toBeNull();
  });

  test('удачный запрос на выполнение заказа', () => {
    const state = reducer(
      {
        isOrderConfirmed: false,
        isOrderRequested: true,
        completed: null
      },
      performOrder.fulfilled(
        {
          success: true,
          order: constant.mockOrderOne,
          name: 'somename'
        },
        '',
        constant.mockOrderOne.ingredients
      )
    );
    expect(state.isOrderConfirmed).toBe(false);
    expect(state.isOrderRequested).toBe(false);
    expect(state.completed).toEqual(constant.mockOrderOne);
  });

  test('сброс заказа', () => {
    const state = reducer(
      {
        isOrderConfirmed: false,
        isOrderRequested: false,
        completed: constant.mockOrderOne
      },
      clearOrder()
    );
    expect(state.isOrderConfirmed).toBe(false);
    expect(state.isOrderRequested).toBe(false);
    expect(state.completed).toBeNull();
  });
});
