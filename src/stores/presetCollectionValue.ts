import { createSlice } from '@reduxjs/toolkit';
import amber from '@material-ui/core/colors/amber';
// import chroma from 'chroma-js';

import {
  SingleColorGlCollectionType,
  SingleColorMultiBlendsGlCollectionType,
  MultiColorsGlCollectionType,
  SingleImageGlCollectionType,
  SingleImageMultiBlendsGlCollectionType,
  MultiImagesGlCollectionType,
} from './collectionData';

export type presetCollectionValueType = {
  singleColor: Partial<SingleColorGlCollectionType>;
  singleColorMultiBlends: Partial<SingleColorMultiBlendsGlCollectionType>;
  multiColors: Partial<MultiColorsGlCollectionType>;
  singleImage: Partial<SingleImageGlCollectionType>;
  singleImagesMultiBlends: Partial<SingleImageMultiBlendsGlCollectionType>;
  multiImages: Partial<MultiImagesGlCollectionType>;
};

const initialState: presetCollectionValueType = {
  singleColor: {
    color: '#000000',
    blendMode: 'normal',
  },
  singleColorMultiBlends: {
    color: '#000000',
    blendMode: [],
  },
  multiColors: {
    color: [...Object.values(amber)],
    blendMode: 'normal',
  },
  singleImage: {
    blendMode: 'normal',
  },
  singleImagesMultiBlends: {
    blendMode: [],
  },
  multiImages: {
    blendMode: 'normal',
  },
};

const slice = createSlice({
  name: 'stockedColors',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
