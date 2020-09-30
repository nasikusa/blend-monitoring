/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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

type AddValuePayloadType = {
  targetId: IdType;
  targetNewValue: collectionValueBlendModeValueType;
};

type DeleteValuePayloadType = {
  targetId: IdType;
};

export type UpdateValueValuePayloadType = {
  targetId: IdType;
  targetNewValue: collectionValueBlendModeValueType;
};

const initialState: collectionValueBlendModeDictionaryType = {};

const slice = createSlice({
  name: 'collectionItemValueBlendMode',
  initialState,
  reducers: {
    addValue: (state, { payload }: PayloadAction<AddValuePayloadType>) => {
      const { targetId, targetNewValue } = payload;
      state[targetId] = {
        id: targetId,
        value: targetNewValue,
        type: 'blendMode',
      };
    },
    deleteItem: (state, { payload }: PayloadAction<DeleteValuePayloadType>) => {
      const { targetId } = payload;
      delete state[targetId];
    },
    updateValueValue: (
      state,
      { payload }: PayloadAction<UpdateValueValuePayloadType>
    ) => {
      const { targetId, targetNewValue } = payload;
      state[targetId].value = targetNewValue;
    },
  },
});

export default slice.reducer;

export const { addValue, updateValueValue, deleteItem } = slice.actions;
