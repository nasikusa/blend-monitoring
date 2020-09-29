/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { BlendModesType } from '../../constants/blendMode/blendModeData';
import { IdType } from '../../types/collection/collectionData';
import { baseCollectionValueType } from '../../types/collection/collectionValueType';

export type collectionValueBlendModeValueType = BlendModesType;

export type collectionValueBlendModeType = baseCollectionValueType & {
  readonly id: IdType;
  value: collectionValueBlendModeValueType;
  readonly type: 'blendMode';
};

export type collectionValueBlendModeDictionaryType = {
  [key: string]: collectionValueBlendModeType;
};

const initialState: collectionValueBlendModeDictionaryType = {};

const slice = createSlice({
  name: 'collectionItemValueBlendMode',
  initialState,
  reducers: {
    addValue: (state, action) => {
      const { targetId, targetNewValue } = action.payload;
      state[targetId] = {
        id: targetId,
        value: targetNewValue,
        type: 'blendMode',
      };
    },
    deleteItem: (state, action) => {
      const { targetId } = action.payload;
      delete state[targetId];
    },
    updateValueValue: (state, action) => {
      const { targetId, targetNewValue } = action.payload;
      state[targetId].value = targetNewValue;
    },
  },
});

export default slice.reducer;

export const { addValue, updateValueValue, deleteItem } = slice.actions;
