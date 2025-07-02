import { expect, test } from '@jest/globals';
import { reducer, fetchOrder } from './sliceOrderCard';
import * as constant from '../constants/constants';

describe('тестируем редьюсер ленты заказов', () => {
  test('запрос карточки заказа', () => {
    const state = reducer(
      {
        isOrderRequested: false,
        order: constant.mockOrderToo
      },
      fetchOrder.pending('', 777)
    );
    expect(state.isOrderRequested).toBe(true);
    expect(state.order).toBe(constant.mockOrderToo);
  });

  test('неудачный запрос карточки заказа', () => {
    const state = reducer(
      {
        isOrderRequested: true,
        order: constant.mockOrderToo
      },
      fetchOrder.rejected(new Error('check'), '', 777)
    );
    expect(state.isOrderRequested).toBe(false);
    expect(state.order).toBe(constant.mockOrderToo);
  });

  test('удачный запрос карточки заказа', () => {
    const state = reducer(
      {
        isOrderRequested: true,
        order: constant.mockOrderToo
      },
      fetchOrder.fulfilled(
        {
          success: true,
          orders: [constant.mockOrderOne]
        },
        '',
        777
      )
    );
    expect(state.isOrderRequested).toBe(false);
    expect(state.order).toEqual(constant.mockOrderOne);
  });
});
