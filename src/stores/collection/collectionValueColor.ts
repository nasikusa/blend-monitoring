/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdType } from '../../types/collection/collectionData';
import { baseCollectionValueType } from '../../types/collection/collectionValueType';

export type collectionValueColorValueType = string;

export type collectionValueColorType = baseCollectionValueType & {
  readonly id: IdType;
  value: collectionValueColorValueType;
  readonly type: 'color';
};

export type collectionValueColorDictionaryType = {
  [key: string]: collectionValueColorType;
};

export type UpdateValuePayloadType = {
  targetId: IdType | IdType[];
  targetIdNewValue:
    | collectionValueColorValueType
    | collectionValueColorValueType[];
};

type AddValuePayloadType = {
  targetId: IdType;
  targetNewValue: collectionValueColorValueType;
};

const initialState: collectionValueColorDictionaryType = {};

const slice = createSlice({
  name: 'collectionValueColor',
  initialState,
  reducers: {
    addValue: (state, { payload }: PayloadAction<AddValuePayloadType>) => {
      const { targetId, targetNewValue } = payload;
      state[targetId] = {
        id: targetId,
        value: targetNewValue,
        type: 'color',
      };
    },
    deleteItem: (state, action) => {
      const { targetId } = action.payload;
      delete state[targetId];
    },
    updateValueValue: (
      state,
      action: { type: string; payload: UpdateValuePayloadType }
    ) => {
      const { targetId, targetIdNewValue } = action.payload;

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

export const { addValue, deleteItem, updateValueValue } = slice.actions;
