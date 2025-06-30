import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

export const performOrder = createAsyncThunk(
  'feeds/newOrder',
  async (ingredients: string[]) => orderBurgerApi(ingredients)
);

export interface StateOrder {
  isOrderConfirmed: boolean;
  isOrderRequested: boolean;
  completed: TOrder | null;
}

const initialStateOrder: StateOrder = {
  isOrderConfirmed: false,
  isOrderRequested: false,
  completed: null
};

export const sliceOrder = createSlice({
  name: 'order',
  initialState: initialStateOrder,
  reducers: {
    confirmOrder: (state) => {
      state.isOrderConfirmed = true;
    },
    clearOrder: (state) => {
      state.completed = null;
    }
  },
  selectors: {
    selectOrderConfirmed: (state) => state.isOrderConfirmed,
    selectOrderRequested: (state) => state.isOrderRequested,
    selectOrderCompleted: (state) => state.completed
  },
  extraReducers: (builder) => {
    builder
      .addCase(performOrder.pending, (state) => {
        state.isOrderRequested = true;
        state.isOrderConfirmed = false;
      })
      .addCase(performOrder.rejected, (state, action) => {
        state.isOrderRequested = false;
      })
      .addCase(performOrder.fulfilled, (state, action) => {
        state.isOrderRequested = false;
        state.completed = action.payload.order;
      });
  }
});

export const { confirmOrder, clearOrder } = sliceOrder.actions;

export const {
  selectOrderConfirmed,
  selectOrderRequested,
  selectOrderCompleted
} = sliceOrder.selectors;
