import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../utils/burger-api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export interface StateIngredients {
  isLoading: boolean;
  ingredients: TIngredient[] | null;
  lastError: string | null;
}

export const initialStateIngredients: StateIngredients = {
  isLoading: true,
  ingredients: null,
  lastError: null
};

export const sliceIngredients = createSlice({
  name: 'ingredients',
  initialState: initialStateIngredients,
  reducers: {},
  selectors: {
    selectIsIngredientsLoading: (state) => state.isLoading,
    selectIngredients: (state) => state.ingredients,
    selectBuns: (state) =>
      state.ingredients
        ? state.ingredients.filter((value: TIngredient) => value.type === 'bun')
        : [],
    selectMains: (state) =>
      state.ingredients
        ? state.ingredients.filter(
            (value: TIngredient) => value.type === 'main'
          )
        : [],
    selectSauces: (state) =>
      state.ingredients
        ? state.ingredients.filter(
            (value: TIngredient) => value.type === 'sauce'
          )
        : [],
    selectIngradient: (state, id: string) =>
      state.ingredients?.find((value: TIngredient) => value._id == id)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.lastError = action.error.message || 'error';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
        state.lastError = null;
      });
  }
});

export const {
  selectIsIngredientsLoading,
  selectIngredients,
  selectBuns,
  selectMains,
  selectSauces,
  selectIngradient
} = sliceIngredients.selectors;
export const reducer = sliceIngredients.reducer;
