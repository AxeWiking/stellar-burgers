import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface StateDesigner {
  bun: TConstructorIngredient | null;
  filling: TConstructorIngredient[];
}

export const initialStateDesigner: StateDesigner = {
  bun: null,
  filling: []
};

export const sliceDesigner = createSlice({
  name: 'designer',
  initialState: initialStateDesigner,
  reducers: {
    pickIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.filling.push(action.payload);
        }
      },
      prepare: (bun: TIngredient) => {
        const id = nanoid();
        return { payload: { ...bun, id } };
      }
    },
    designTuneLess: (state, action: PayloadAction<string>) => {
      const index = state.filling.findIndex(
        (value: TConstructorIngredient) => value.id === action.payload
      );
      if (index > 0) {
        const item = state.filling[index];
        state.filling[index] = state.filling[index - 1];
        state.filling[index - 1] = item;
      }
    },
    designTuneMore: (state, action: PayloadAction<string>) => {
      const index = state.filling.findIndex(
        (value: TConstructorIngredient) => value.id === action.payload
      );
      if (index >= 0 && index + 1 < state.filling.length) {
        const item = state.filling[index];
        state.filling[index] = state.filling[index + 1];
        state.filling[index + 1] = item;
      }
    },
    designTuneDrop: (state, action: PayloadAction<string>) => {
      state.filling = state.filling.filter(
        (value: TConstructorIngredient) => value.id !== action.payload
      );
    },
    designClear: (state) => {
      state.bun = null;
      state.filling = [];
    }
  },
  selectors: {
    selectBurgerBun: (state) => state.bun,
    selectBurgerFilling: (state) => state.filling
  }
});

export const {
  pickIngredient,
  designTuneLess,
  designTuneMore,
  designTuneDrop,
  designClear
} = sliceDesigner.actions;

export const { selectBurgerBun, selectBurgerFilling } = sliceDesigner.selectors;
export const reducer = sliceDesigner.reducer;
