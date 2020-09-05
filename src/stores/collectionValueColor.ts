import { createSlice } from '@reduxjs/toolkit';

export type collectionItemValueColorType = string;

export type collectionItemValueColorDictionaryType = {
  [key: string]: collectionItemValueColorType;
};

const initialState: collectionItemValueColorDictionaryType = {
  '82ceb1d9-1f61-4797-9838-738988d46054': '#000000',
  'cdc0644b-a77a-4e2a-8abc-d77ed88b108e': '#ff0000',
};

const slice = createSlice({
  name: 'collectionItemValueColor',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
