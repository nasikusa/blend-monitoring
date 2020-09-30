/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdType } from '../../types/collection/collectionData';
import { baseCollectionValueType } from '../../types/collection/collectionValueType';

export type collectionValueImageValueType = string;

export type collectionValueImageType = baseCollectionValueType & {
  readonly id: IdType;
  value: collectionValueImageValueType;
  readonly type: 'image';
};

export type collectionValueImageDictionaryType = {
  [key: string]: collectionValueImageType;
};

export type UpdateValuePayloadType = {
  targetId: IdType | IdType[];
  targetIdNewValue:
    | collectionValueImageValueType
    | collectionValueImageValueType[];
};

type addValuePayloadType = {
  targetId: IdType;
  targetIdNewValue: collectionValueImageValueType;
};

type deleteValuePayloadType = {
  targetId: IdType;
};

const initialState: collectionValueImageDictionaryType = {};

const slice = createSlice({
  name: 'collectionValueImage',
  initialState,
  reducers: {
    addValue: (state, { payload }: PayloadAction<addValuePayloadType>) => {
      const { targetId, targetIdNewValue } = payload;
      state[targetId] = {
        id: targetId,
        value: targetIdNewValue,
        type: 'image',
      };
    },
    deleteValue: (
      state,
      { payload }: PayloadAction<deleteValuePayloadType>
    ) => {
      const { targetId } = payload;
      delete state[targetId];
    },
    updateValueValue: (
      state,
      { payload }: PayloadAction<UpdateValuePayloadType>
    ) => {
      const { targetId, targetIdNewValue } = payload;

      // どちらも配列場合
      if (Array.isArray(targetId) && Array.isArray(targetIdNewValue)) {
        targetId.forEach((singleTargetId, currentIndex) => {
          state[singleTargetId].value = targetIdNewValue[currentIndex];
        });
      } else if (
        // idのみ配列場合
        Array.isArray(targetId) &&
        typeof targetIdNewValue === 'string'
      ) {
        targetId.forEach((singleTargetId) => {
          state[singleTargetId].value = targetIdNewValue;
        });
      } else if (
        // どちらも配列でない場合
        typeof targetId === 'string' &&
        typeof targetIdNewValue === 'string'
      ) {
        state[targetId].value = targetIdNewValue;
      }
    },
  },
});

export default slice.reducer;

export const { addValue, deleteValue, updateValueValue } = slice.actions;
