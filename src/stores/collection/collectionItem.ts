/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type collectionItemTypeType = 'image' | 'color';

export type BaseCollectionItemType = {
  id: string;
  type: collectionItemTypeType;
  blendMode: string;
  opacity: string;
  visibility: string;
};

export type ColorCollectionItemType = BaseCollectionItemType & {
  type: 'color';
  color: string;
  image?: undefined;
};

export type ImageCollectionItemType = BaseCollectionItemType & {
  type: 'image';
  image: string;
  color?: undefined;
};

export type collectionItemType =
  | ColorCollectionItemType
  | ImageCollectionItemType;

export type collectionItemDictionaryType = {
  [key: string]: collectionItemType;
};

type AddItemBasePayloadType = {
  targetId: string;
  targetBlendModeId: string;
  targetOpacityId: string;
  targetVisibilityId: string;
};

type AddItemImagePayloadType = AddItemBasePayloadType & {
  targetImageId: string;
  targetType: 'image';
};
type AddItemColorPayloadType = AddItemBasePayloadType & {
  targetColorId: string;
  targetType: 'color';
};

type AddItemPayloadType = AddItemImagePayloadType | AddItemColorPayloadType;

const initialState: collectionItemDictionaryType = {
  '6157939d-befc-4d1e-b3b2-24ce096919c1': {
    id: '6157939d-befc-4d1e-b3b2-24ce096919c1',
    type: 'color',
    blendMode: 'c29adfe8-ee66-4c9b-ba09-e629affad3a2',
    opacity: '40818509-da04-44fd-baf2-af23312c7e36',
    visibility: '02d077cf-e936-41cd-b725-3d841691aabd',
    color: '82ceb1d9-1f61-4797-9838-738988d46054',
  },
  '5c5f4f06-9466-40b8-bf78-75c3dcca1a8a': {
    id: '5c5f4f06-9466-40b8-bf78-75c3dcca1a8a',
    type: 'color',
    blendMode: '0f433df2-1e1e-4df3-baf1-ab96052c1f9c',
    opacity: 'bef45475-7567-42c3-b8ee-0901b7470134',
    visibility: '557f8233-3b5a-4250-8499-c5c1243b9fd8',
    color: 'cdc0644b-a77a-4e2a-8abc-d77ed88b108e',
  },
  '49c32a24-3c3d-4202-97b5-8e7b5a2f5774': {
    id: '49c32a24-3c3d-4202-97b5-8e7b5a2f5774',
    type: 'color',
    blendMode: '0f433df2-1e1e-4df3-baf1-ab96052c1f9c',
    opacity: 'bef45475-7567-42c3-b8ee-0901b7470134',
    visibility: '557f8233-3b5a-4250-8499-c5c1243b9fd8',
    color: '62756cf0-e438-4e77-bc81-c73bb6f46bca',
  },
  '701cc008-42f3-4a19-829c-52035544296e': {
    id: '701cc008-42f3-4a19-829c-52035544296e',
    type: 'image',
    blendMode: '0f433df2-1e1e-4df3-baf1-ab96052c1f9c',
    opacity: 'bef45475-7567-42c3-b8ee-0901b7470134',
    visibility: '557f8233-3b5a-4250-8499-c5c1243b9fd8',
    image: '369a776b-5640-4d3d-9dfe-6d1d6ccc9150',
  },
};

const slice = createSlice({
  name: 'collectionItem',
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<AddItemPayloadType>) => {
      const {
        targetId,
        targetBlendModeId,
        targetOpacityId,
        targetVisibilityId,
        ...others
      } = payload;
      if (others.targetType === 'color') {
        const { targetColorId } = others;
        state[targetId] = {
          id: targetId,
          type: others.targetType,
          blendMode: targetBlendModeId,
          opacity: targetOpacityId,
          visibility: targetVisibilityId,
          color: targetColorId,
        };
      } else if (others.targetType === 'image') {
        const { targetImageId } = others;
        state[targetId] = {
          id: targetId,
          type: others.targetType,
          blendMode: targetBlendModeId,
          opacity: targetOpacityId,
          visibility: targetVisibilityId,
          image: targetImageId,
        };
      }
    },
  },
});

export default slice.reducer;

export const { addItem } = slice.actions;
