import { createSlice } from '@reduxjs/toolkit';
import { IdType } from '../../types/collection/collectionData';
// import { v4 as uuidv4 } from 'uuid';

export type sceneCollectionsType = string[];

export type sceneCollectionsDictionaryType = {
  [key: string]: {
    readonly id: IdType;
    innerCollectionId: string[];
    createdAt?: string;
  };
};

const initialState: sceneCollectionsDictionaryType = {
  'f3207729-f0ca-4728-9acb-175551c9f442': {
    id: 'f3207729-f0ca-4728-9acb-175551c9f442',
    innerCollectionId: [
      '96b04eec-b025-421b-aabc-2f08a629949c',
      'af31d35d-2144-43de-8108-855e493805c9',
    ],
  },
};

const slice = createSlice({
  name: 'sceneCollections',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
