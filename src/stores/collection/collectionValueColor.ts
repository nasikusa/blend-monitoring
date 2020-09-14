import { createSlice } from '@reduxjs/toolkit';
import { IdType } from '../../types/collection/collectionData';
import { baseCollectionValueType } from '../../types/collection/collectionValueType';

export type collectionValueColorValueType = string;

export type collectionValueColorType = {
  readonly id: IdType;
  value: collectionValueColorValueType;
  readonly type: 'color';
};

export type collectionValueColorDictionaryType = {
  [key: string]: baseCollectionValueType & collectionValueColorType;
};

const initialState: collectionValueColorDictionaryType = {
  '82ceb1d9-1f61-4797-9838-738988d46054': {
    id: '82ceb1d9-1f61-4797-9838-738988d46054',
    value: '#0000ff',
    type: 'color',
  },
  'cdc0644b-a77a-4e2a-8abc-d77ed88b108e': {
    id: 'cdc0644b-a77a-4e2a-8abc-d77ed88b108e',
    value: '#ff0000',
    type: 'color',
  },
};

const slice = createSlice({
  name: 'collectionValueColor',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
