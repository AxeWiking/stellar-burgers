import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export const fetchOrder = createAsyncThunk(
  'feeds/order',
  async (number: number) => getOrderByNumberApi(number)
);

export interface StateOrder {
  isOrderRequested: boolean;
  order: TOrder | null;
}

const initialStateOrder: StateOrder = {
  isOrderRequested: false,
  order: null
};

export const sliceOrderCard = createSlice({
  name: 'orderCard',
  initialState: initialStateOrder,
  reducers: {},
  selectors: {
    selectOrderRequested: (state) => state.isOrderRequested,
    selectOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.isOrderRequested = true;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isOrderRequested = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isOrderRequested = false;
        state.order = action.payload.orders[0];
      });
  }
});

export const { selectOrderRequested, selectOrder } = sliceOrderCard.selectors;
