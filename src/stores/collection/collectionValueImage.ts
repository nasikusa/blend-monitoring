import { createSlice } from '@reduxjs/toolkit';
import { baseCollectionValueType } from '../../types/collection/collectionValueType';

export type collectionValueImageValueType = string;

export type collectionValueImageType = {
  value: collectionValueImageValueType;
  readonly type: 'image';
};

export type collectionValueImageDictionaryType = {
  [key: string]: baseCollectionValueType & collectionValueImageType;
};

const initialState: collectionValueImageDictionaryType = {};

const slice = createSlice({
  name: 'collectionValueImage',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
