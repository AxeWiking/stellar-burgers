import { expect, test } from '@jest/globals';
import {
  initialStateFeeds,
  reducer,
  StateFeeds,
  fetchFeeds
} from './sliceFeeds';
import * as constant from '../constants/constants';

describe('тестируем редьюсер ленты заказов', () => {
  const mockFeeds = [constant.mockOrderOne, constant.mockOrderToo];
  const mockTotal = 10;
  const mockTotalToday = 13;
  const mockStateFeeds: StateFeeds = {
    isFeedsLoading: false,
    feeds: mockFeeds,
    total: mockTotal,
    totalToday: mockTotalToday
  };

  test('запрос содержимого ленты', () => {
    const state = reducer(mockStateFeeds, fetchFeeds.pending(''));
    expect(state.isFeedsLoading).toBe(true);
    expect(state.feeds).toBe(mockFeeds);
    expect(state.total).toBe(mockTotal);
    expect(state.totalToday).toBe(mockTotalToday);
  });

  test('неудачный запрос содержимого ленты', () => {
    const state = reducer(
      {
        ...mockStateFeeds,
        isFeedsLoading: true
      },
      fetchFeeds.rejected(new Error('check'), '')
    );
    expect(state.isFeedsLoading).toBe(false);
    expect(state.feeds).toBe(mockFeeds);
    expect(state.total).toBe(mockTotal);
    expect(state.totalToday).toBe(mockTotalToday);
  });

  test('удачный запрос содержимого ленты', () => {
    const state = reducer(
      initialStateFeeds,
      fetchFeeds.fulfilled(
        {
          success: true,
          orders: mockFeeds,
          total: mockTotal,
          totalToday: mockTotalToday
        },
        ''
      )
    );
    expect(state.isFeedsLoading).toBe(false);
    expect(state.feeds).toEqual(mockFeeds);
    expect(state.total).toEqual(mockTotal);
    expect(state.totalToday).toEqual(mockTotalToday);
  });
});
