import { createSlice } from '@reduxjs/toolkit';
import { BlendModesType } from '../../constants/blendMode/blendModeData';

export type collectionItemValueBlendModeType = BlendModesType;

export type collectionItemValueBlendModeDictionaryType = {
  [key: string]: collectionItemValueBlendModeType;
};

const initialState: collectionItemValueBlendModeDictionaryType = {
  'c29adfe8-ee66-4c9b-ba09-e629affad3a2': 'normal',
  '05a8a69e-c0a8-4d4e-910e-ee6017d8be9a': 'multiply',
  '0f433df2-1e1e-4df3-baf1-ab96052c1f9c': 'screen',
};

const slice = createSlice({
  name: 'collectionItemValueBlendMode',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
