/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdType } from '../../types/collection/collectionData';
import { baseCollectionValueType } from '../../types/collection/collectionValueType';

export type collectionValueVisibilityValueType = boolean;

export type collectionValueVisibilityType = baseCollectionValueType & {
  readonly id: IdType;
  value: collectionValueVisibilityValueType;
  readonly type: 'visibility';
};

export type collectionValueVisibilityDictionaryType = {
  [key: string]: collectionValueVisibilityType;
};

type AddValuePayloadType = {
  targetId: IdType;
  targetNewValue: collectionValueVisibilityValueType;
};

const initialState: collectionValueVisibilityDictionaryType = {
  '02d077cf-e936-41cd-b725-3d841691aabd': {
    id: '02d077cf-e936-41cd-b725-3d841691aabd',
    value: true,
    type: 'visibility',
  },
  '557f8233-3b5a-4250-8499-c5c1243b9fd8': {
    id: '557f8233-3b5a-4250-8499-c5c1243b9fd8',
    value: true,
    type: 'visibility',
  },
};

const slice = createSlice({
  name: 'collectionValueVisibility',
  initialState,
  reducers: {
    addValue: (state, { payload }: PayloadAction<AddValuePayloadType>) => {
      const { targetId, targetNewValue } = payload;
      state[targetId] = {
        id: targetId,
        value: targetNewValue,
        type: 'visibility',
      };
    },
  },
});

export default slice.reducer;

export const { addValue } = slice.actions;
