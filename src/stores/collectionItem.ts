import { createSlice } from '@reduxjs/toolkit';

export type collectionItemTypeType = 'image' | 'color';

export type BaseCollectionItemType = {
  id: string;
  type: collectionItemTypeType;
  blendMode: string;
  opacity: string;
  visibility: string;
};

export type ColorCollectionItemType = BaseCollectionItemType & {
  type: 'color';
  color: string;
  image?: undefined;
};

export type ImageCollectionItemType = BaseCollectionItemType & {
  type: 'image';
  image: string;
  color?: undefined;
};

export type collectionItemType =
  | ColorCollectionItemType
  | ImageCollectionItemType;

export type collectionItemDictionaryType = {
  [key: string]: collectionItemType;
};

const initialState: collectionItemDictionaryType = {};

const slice = createSlice({
  name: 'collectionItem',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
