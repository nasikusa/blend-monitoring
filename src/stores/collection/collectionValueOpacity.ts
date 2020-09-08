import { createSlice } from '@reduxjs/toolkit';
import { IdType } from '../../types/collection/collectionData';
import { baseCollectionValueType } from '../../types/collection/collectionValueType';

export type collectionValueOpacityValueType = number;

export type collectionValueOpacityType = {
  readonly id: IdType;
  value: collectionValueOpacityValueType;
  readonly type: 'opacity';
};

export type collectionValueOpacityDictionaryType = {
  [key: string]: baseCollectionValueType & collectionValueOpacityType;
};

const initialState: collectionValueOpacityDictionaryType = {
  '40818509-da04-44fd-baf2-af23312c7e36': {
    id: '40818509-da04-44fd-baf2-af23312c7e36',
    value: 0.25,
    type: 'opacity',
  },
  'bef45475-7567-42c3-b8ee-0901b7470134': {
    id: 'bef45475-7567-42c3-b8ee-0901b7470134',
    value: 1.0,
    type: 'opacity',
  },
};

const slice = createSlice({
  name: 'collectionValueOpacity',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
