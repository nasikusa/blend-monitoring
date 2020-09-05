import { createSlice } from '@reduxjs/toolkit';

export type collectionItemValueVisibilityType = boolean;

export type collectionItemValueVisibilityDictionaryType = {
  [key: string]: collectionItemValueVisibilityType;
};

const initialState: collectionItemValueVisibilityDictionaryType = {};

const slice = createSlice({
  name: 'collectionItemValueVisibility',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
