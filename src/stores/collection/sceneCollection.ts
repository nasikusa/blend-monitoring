import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdType } from '../../types/collection/collectionData';

export type sceneCollectionsType = string[];

export type sceneCollectionsDictionaryType = {
  [key: string]: {
    readonly id: IdType;
    innerCollectionId: IdType[];
    createdAt?: string;
  };
};

type AddInnerItemPayloadType = {
  targetId: IdType;
  targetInnerItemId: IdType;
  addIndexType: 'first' | 'last' | 'index';
  targetInnerItemIndex?: number;
};

type DeleteInnerItemPayloadType = {
  targetId: IdType;
  targetInnerId: IdType;
};

const initialState: sceneCollectionsDictionaryType = {
  'f3207729-f0ca-4728-9acb-175551c9f442': {
    id: 'f3207729-f0ca-4728-9acb-175551c9f442',
    innerCollectionId: [],
  },
};

const slice = createSlice({
  name: 'sceneCollection',
  initialState,
  reducers: {
    addSceneCollectionInnerItem: (
      state,
      { payload }: PayloadAction<AddInnerItemPayloadType>
    ) => {
      const {
        targetId,
        targetInnerItemId,
        addIndexType,
        targetInnerItemIndex,
      } = payload;
      const { innerCollectionId } = state[targetId];
      if (targetInnerItemIndex != null && addIndexType === 'index') {
        innerCollectionId.splice(targetInnerItemIndex, 0, targetInnerItemId);
      } else if (addIndexType === 'last') {
        innerCollectionId.push(targetInnerItemId);
      } else if (addIndexType === 'first') {
        innerCollectionId.unshift(targetInnerItemId);
      } else {
        innerCollectionId.push(targetInnerItemId);
      }
    },
    deleteSceneCollectionInnerItem: (
      state,
      { payload }: PayloadAction<DeleteInnerItemPayloadType>
    ) => {
      const { targetId, targetInnerId } = payload;
      const innerItemIDValue = state[targetId].innerCollectionId;
      if (Array.isArray(innerItemIDValue)) {
        const index = innerItemIDValue.findIndex(
          (singleInnerItemID) => singleInnerItemID === targetInnerId
        );
        if (index !== -1) innerItemIDValue.splice(index, 1);
      }
    },
  },
});

export default slice.reducer;

export const {
  deleteSceneCollectionInnerItem,
  addSceneCollectionInnerItem,
} = slice.actions;
