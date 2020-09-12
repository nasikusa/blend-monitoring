/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { BlendModesType } from '../../constants/blendMode/blendModeData';
import { IdType } from '../../types/collection/collectionData';
import { baseCollectionValueType } from '../../types/collection/collectionValueType';

export type collectionValueBlendModeValueType = BlendModesType;

export type collectionValueBlendModeType = {
  readonly id: IdType;
  value: collectionValueBlendModeValueType;
  readonly type: 'blendMode';
} & baseCollectionValueType;

export type collectionValueBlendModeDictionaryType = {
  [key: string]: collectionValueBlendModeType;
};

const initialState: collectionValueBlendModeDictionaryType = {
  'c29adfe8-ee66-4c9b-ba09-e629affad3a2': {
    id: 'c29adfe8-ee66-4c9b-ba09-e629affad3a2',
    value: 'normal',
    type: 'blendMode',
  },
  '05a8a69e-c0a8-4d4e-910e-ee6017d8be9a': {
    id: '05a8a69e-c0a8-4d4e-910e-ee6017d8be9a',
    value: 'overlay',
    type: 'blendMode',
  },
  '0f433df2-1e1e-4df3-baf1-ab96052c1f9c': {
    id: '0f433df2-1e1e-4df3-baf1-ab96052c1f9c',
    value: 'screen',
    type: 'blendMode',
  },
};

const slice = createSlice({
  name: 'collectionItemValueBlendMode',
  initialState,
  reducers: {
    deleteValue: (state, action) => {
      const { targetId } = action.payload;
      delete state[targetId];
    },
  },
});

export default slice.reducer;

export const { deleteValue } = slice.actions;
