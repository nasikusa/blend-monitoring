import { createSlice } from '@reduxjs/toolkit';

export type collectionItemValueVisibilityType = boolean;

export type collectionItemValueVisibilityDictionaryType = {
  [key: string]: collectionItemValueVisibilityType;
};

const initialState: collectionItemValueVisibilityDictionaryType = {
  '02d077cf-e936-41cd-b725-3d841691aabd': true,
  '557f8233-3b5a-4250-8499-c5c1243b9fd8': true,
};

const slice = createSlice({
  name: 'collectionItemValueVisibility',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
