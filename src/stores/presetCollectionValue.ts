import { createSlice } from '@reduxjs/toolkit';

import {
  SingleColorGlCollectionType,
  SingleColorMultiBlendsGlCollectionType,
  MultiColorsGlCollectionType,
  SingleImageGlCollectionType,
  SingleImageMultiBlendsGlCollectionType,
  MultiImagesGlCollectionType,
} from './collectionData';

// const hues = [15, 45, 80, 115, 140, 175, 200, 235, 270, 315, 340];

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
    color: ['#000000'],
    blendMode: [],
  },
  multiColors: {
    color: ['#000000'],
    blendMode: ['normal'],
  },
  singleImage: {
    blendMode: 'normal',
  },
  singleImagesMultiBlends: {
    blendMode: [],
  },
  multiImages: {
    blendMode: ['normal'],
  },
};

const slice = createSlice({
  name: 'stockedColors',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
