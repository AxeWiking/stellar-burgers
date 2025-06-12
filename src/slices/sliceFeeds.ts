import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi, getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchFeeds = createAsyncThunk('feeds/getAll', async () =>
  getFeedsApi()
);

export interface StateFeeds {
  isFeedsLoading: boolean;
  feeds: TOrder[] | null;
  total: number | null;
  totalToday: number | null;
}

const initialStateFeeds: StateFeeds = {
  isFeedsLoading: false,
  feeds: null,
  total: null,
  totalToday: null
};

export const sliceFeeds = createSlice({
  name: 'feeds',
  initialState: initialStateFeeds,
  reducers: {},
  selectors: {
    selectFeedsLoaded: (state) => !!state.feeds,
    selectFeedsLoading: (state) => state.isFeedsLoading,
    selectFeeds: (state) => state.feeds,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isFeedsLoading = true;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isFeedsLoading = false;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        if (action.payload.success) {
          state.feeds = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      });
  }
});

export const {
  selectFeedsLoaded,
  selectFeedsLoading,
  selectFeeds,
  selectTotal,
  selectTotalToday
} = sliceFeeds.selectors;
