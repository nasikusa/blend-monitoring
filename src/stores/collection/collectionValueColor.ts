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

export type UpdateValuePayloadType = {
  targetId: IdType | IdType[];
  targetIdNewValue:
    | collectionValueColorValueType
    | collectionValueColorValueType[];
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
  '62756cf0-e438-4e77-bc81-c73bb6f46bca': {
    id: '62756cf0-e438-4e77-bc81-c73bb6f46bca',
    value: '#ccff00',
    type: 'color',
  },
};

const slice = createSlice({
  name: 'collectionValueColor',
  initialState,
  reducers: {
    addValue: (state, action) => {
      const { targetId, targetNewValue } = action.payload;
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
