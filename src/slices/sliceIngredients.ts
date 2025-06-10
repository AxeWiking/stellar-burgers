import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export interface StateIngredients {
  isLoaded: boolean;
  isLoading: boolean;
  ingredients: TIngredient[];
}

const initialStateIngredients: StateIngredients = {
  isLoaded: false,
  isLoading: false,
  ingredients: []
};

export const sliceIngredients = createSlice({
  name: 'ingredients',
  initialState: initialStateIngredients,
  reducers: {},
  selectors: {
    selectIsIngredientsLoaded: (state) => state.isLoaded,
    selectIsIngredientsLoading: (state) => state.isLoading,
    selectIngredients: (state) => state.ingredients,
    selectBuns: (state) =>
      state.ingredients.filter((value: TIngredient) => value.type === 'bun'),
    selectMains: (state) =>
      state.ingredients.filter((value: TIngredient) => value.type === 'main'),
    selectSauces: (state) =>
      state.ingredients.filter((value: TIngredient) => value.type === 'sauce'),
    selectIngradient: (state, id: string) =>
      state.ingredients.find((value: TIngredient) => value._id == id)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoaded = true;
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const {
  selectIsIngredientsLoaded,
  selectIsIngredientsLoading,
  selectIngredients,
  selectBuns,
  selectMains,
  selectSauces,
  selectIngradient
} = sliceIngredients.selectors;
