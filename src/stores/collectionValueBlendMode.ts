import { createSlice } from '@reduxjs/toolkit';
import { BlendModesType } from '../constants/blendModeData';

export type collectionItemValueBlendModeType = BlendModesType;

export type collectionItemValueBlendModeDictionaryType = {
  [key: string]: collectionItemValueBlendModeType;
};

const initialState: collectionItemValueBlendModeDictionaryType = {};

const slice = createSlice({
  name: 'collectionItemValueBlendMode',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
