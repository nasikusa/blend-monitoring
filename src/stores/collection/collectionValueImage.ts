import { createSlice } from '@reduxjs/toolkit';
import { IdType } from '../../types/collection/collectionData';
import { baseCollectionValueType } from '../../types/collection/collectionValueType';

export type collectionValueImageValueType = string;

export type collectionValueImageType = {
  readonly id: IdType;
  value: collectionValueImageValueType;
  readonly type: 'image';
};

export type collectionValueImageDictionaryType = {
  [key: string]: baseCollectionValueType & collectionValueImageType;
};

const initialState: collectionValueImageDictionaryType = {
  '369a776b-5640-4d3d-9dfe-6d1d6ccc9150': {
    id: '369a776b-5640-4d3d-9dfe-6d1d6ccc9150',
    value: '1ece8d80-6316-4649-ae77-06e1285d8eec',
    type: 'image',
  },
};

const slice = createSlice({
  name: 'collectionValueImage',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
