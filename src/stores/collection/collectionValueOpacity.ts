/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { IdType } from '../../types/collection/collectionData';
import { baseCollectionValueType } from '../../types/collection/collectionValueType';

export type collectionValueOpacityValueType = number;

export type collectionValueOpacityType = baseCollectionValueType & {
  readonly id: IdType;
  value: collectionValueOpacityValueType;
  readonly type: 'opacity';
};

export type collectionValueOpacityDictionaryType = {
  [key: string]: collectionValueOpacityType;
};

export type UpdateValuePayloadType = {
  targetId: IdType | IdType[];
  targetIdNewValue:
    | collectionValueOpacityValueType
    | collectionValueOpacityValueType[];
};

const initialState: collectionValueOpacityDictionaryType = {};

const slice = createSlice({
  name: 'collectionValueOpacity',
  initialState,
  reducers: {
    addValue: (state, action) => {
      const { targetId, targetNewValue } = action.payload;
      state[targetId] = {
        id: targetId,
        value: targetNewValue,
        type: 'opacity',
      };
    },
    updateValue: (
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
        typeof targetIdNewValue === 'number'
      ) {
        targetId.forEach((singleTargetId) => {
          state[singleTargetId].value = targetIdNewValue;
        });
      } else if (
        // どちらも配列でない場合
        typeof targetId === 'string' &&
        typeof targetIdNewValue === 'number'
      ) {
        state[targetId].value = targetIdNewValue;
      }
    },
  },
});

export default slice.reducer;

export const { updateValue, addValue } = slice.actions;
