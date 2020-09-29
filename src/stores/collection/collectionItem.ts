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

const initialState: collectionItemDictionaryType = {};

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
