import { createSlice } from '@reduxjs/toolkit';

export type StockedColorStateType = string[];

const initialState: StockedColorStateType = [];

const slice = createSlice({
  name: 'stockedColors',
  initialState,
  reducers: {
    stockAddColor: (state, action) => {
      const { newColorValue } = action.payload;
      return [...state, newColorValue];
    },
    stockRemoveColor: () => {
      return [];
    },
    replaceAll: (state, action) => {
      const { newState } = action.payload;
      return [...newState];
    },
  },
});

export default slice.reducer;

export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
