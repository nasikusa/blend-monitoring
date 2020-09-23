import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdType } from '../../types/collection/collectionData';
// import { v4 as uuidv4 } from 'uuid';

export type sceneCollectionsType = string[];

export type sceneCollectionsDictionaryType = {
  [key: string]: {
    readonly id: IdType;
    innerCollectionId: IdType[];
    createdAt?: string;
  };
};

type AddSceneCollectionInnerItemReducerType = {
  targetId: string;
  targetInnerItemId: string;
  addIndexType: 'first' | 'last' | 'index';
  targetInnerItemIndex?: number;
};

const initialState: sceneCollectionsDictionaryType = {
  'f3207729-f0ca-4728-9acb-175551c9f442': {
    id: 'f3207729-f0ca-4728-9acb-175551c9f442',
    innerCollectionId: [
      '96b04eec-b025-421b-aabc-2f08a629949c',
      // 'af31d35d-2144-43de-8108-855e493805c9',
      // 'fcf0ba35-f55c-43af-a29b-051c5959fd2b',
    ],
  },
};

const slice = createSlice({
  name: 'sceneCollection',
  initialState,
  reducers: {
    addSceneCollectionInnerItem: (
      state,
      { payload }: PayloadAction<AddSceneCollectionInnerItemReducerType>
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
    deleteSceneCollectionInnerItem: (state, action) => {
      const { targetId, targetInnerId } = action.payload;
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
