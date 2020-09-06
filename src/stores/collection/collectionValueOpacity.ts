import { createSlice } from '@reduxjs/toolkit';

export type collectionItemValueOpacityType = number;

export type collectionItemValueOpacityDictionaryType = {
  [key: string]: collectionItemValueOpacityType;
};

const initialState: collectionItemValueOpacityDictionaryType = {
  '40818509-da04-44fd-baf2-af23312c7e36': 0.25,
  'bef45475-7567-42c3-b8ee-0901b7470134': 1.0,
};

const slice = createSlice({
  name: 'collectionItemValueOpacity',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
