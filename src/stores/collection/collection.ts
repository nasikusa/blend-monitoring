/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

export type SingleItemCollectionTypeType =
  | 'singleColor'
  | 'singleImage'
  | 'base'
  | 'adjust';

/**
 * 複数アイテムを持つ可能性のあるコレクションの種類
 */
export type MultiItemCollectionTypeType =
  | 'singleColorMultiBlends'
  | 'multiColors'
  | 'singleImageMultiBlends'
  | 'multiImages';

/**
 * コレクションの種類。
 */
export type CollectionTypeType =
  | SingleItemCollectionTypeType
  | MultiItemCollectionTypeType;

/**
 * すべてのcollectionのベースとなる型
 */
export type BasicCollectionCategoryType = {
  readonly id: string;
  readonly defaultOpacityId: string;
  readonly defaultVisibilityId: string;
};

/**
 * singleColorコレクションの型
 */
export type SingleColorCollectionCategoryType = BasicCollectionCategoryType & {
  readonly type: 'singleColor';
  readonly roughType: 'color';
  innerItemID: string;
  readonly defaultColorId: string;
  readonly defaultBlendModeId: string;
};

/**
 * singleColorMultiBlendsコレクションの型
 */
export type SingleColorMultiBlendsCollectionCategoryType = BasicCollectionCategoryType & {
  readonly type: 'singleColorMultiBlends';
  readonly roughType: 'color';
  innerItemID: string[];
  readonly defaultColorId: string;
};

/**
 * multiColorsコレクションの型
 */
export type MultiColorsCollectionCategoryType = BasicCollectionCategoryType & {
  readonly type: 'multiColors';
  readonly roughType: 'color';
  innerItemID: string[];
  readonly defaultBlendModeId: string;
};

/**
 * singleImageコレクションの型
 */
export type SingleImageCollectionCategoryType = BasicCollectionCategoryType & {
  readonly type: 'singleImage';
  readonly roughType: 'image';
  innerItemID: string;
  readonly defaultImageId: string;
  readonly defaultBlendModeId: string;
};

/**
 * singleImageMultiBlendsのコレクションの型
 */
export type SingleImageMultiBlendsCollectionCategoryType = BasicCollectionCategoryType & {
  readonly type: 'singleImageMultiBlends';
  readonly roughType: 'image';
  innerItemID: string[];
  readonly defaultImageId: string;
};

export type MultiImagesCollectionCategoryType = BasicCollectionCategoryType & {
  readonly type: 'multiImages';
  readonly roughType: 'image';
  innerItemID: string[];
  readonly defaultBlendModeId: string;
};

export type BaseGlCollectionCategoryType = BasicCollectionCategoryType & {
  readonly type: 'base';
  readonly roughType: 'color';
  innerItemID: string;
  readonly defaultColorId: string;
  readonly defaultBlendModeId: string;
};

/**
 * roughTypeがcolorのcollectionのunion型
 */
export type ColorRelatedCollectionCategoryType =
  | SingleColorCollectionCategoryType
  | SingleColorMultiBlendsCollectionCategoryType
  | MultiColorsCollectionCategoryType;

/**
 * roughTypeがimageのcollectionのunion型
 */
export type ImageRelatedCollectionCategoryType =
  | SingleImageCollectionCategoryType
  | SingleImageMultiBlendsCollectionCategoryType
  | MultiImagesCollectionCategoryType;

/**
 * innerItemIDが単一のcollectionのunion型
 */
export type SingleChildCollectionCategoryType =
  | SingleColorCollectionCategoryType
  | SingleImageCollectionCategoryType;

/**
 * innerItemIDが複数のcollectionのunion型
 */
export type MultipleChildCollectionCategoryType =
  | SingleColorMultiBlendsCollectionCategoryType
  | MultiColorsCollectionCategoryType
  | SingleImageMultiBlendsCollectionCategoryType
  | MultiImagesCollectionCategoryType;

/**
 * 単一のコレクションのtype。
 */
export type CollectionCategoryType =
  | ColorRelatedCollectionCategoryType
  | ImageRelatedCollectionCategoryType;

/**
 * 全コレクションのtype
 */
export type GlCollectionDictionaryType = {
  [key: string]: CollectionCategoryType;
};

const initialState: GlCollectionDictionaryType = {
  '96b04eec-b025-421b-aabc-2f08a629949c': {
    id: '96b04eec-b025-421b-aabc-2f08a629949c',
    type: 'singleColor',
    roughType: 'color',
    innerItemID: '6157939d-befc-4d1e-b3b2-24ce096919c1',
    defaultOpacityId: '40818509-da04-44fd-baf2-af23312c7e36',
    defaultBlendModeId: 'c29adfe8-ee66-4c9b-ba09-e629affad3a2',
    defaultVisibilityId: '02d077cf-e936-41cd-b725-3d841691aabd',
    defaultColorId: '82ceb1d9-1f61-4797-9838-738988d46054',
  },
  'af31d35d-2144-43de-8108-855e493805c9': {
    id: 'af31d35d-2144-43de-8108-855e493805c9',
    type: 'singleColorMultiBlends',
    roughType: 'color',
    innerItemID: [
      '5c5f4f06-9466-40b8-bf78-75c3dcca1a8a',
      '49c32a24-3c3d-4202-97b5-8e7b5a2f5774',
    ],
    defaultOpacityId: 'bef45475-7567-42c3-b8ee-0901b7470134',
    defaultColorId: 'cdc0644b-a77a-4e2a-8abc-d77ed88b108e',
    defaultVisibilityId: '557f8233-3b5a-4250-8499-c5c1243b9fd8',
  },
};

const slice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    deleteCollection: (state, action) => {
      const { targetId } = action.payload;
      delete state[targetId];
    },
    // ↓から innerItemIDが配列のときのみ使用可能
    addCollectionInnerItem: (state, action) => {
      const {
        targetId,
        targetInnerItemId,
        addIndexType,
        targetInnerItemIndex,
      } = action.payload;
      const innerItemId = state[targetId].innerItemID;
      if (Array.isArray(innerItemId)) {
        if (targetInnerItemIndex != null || addIndexType === 'index') {
          innerItemId.splice(targetInnerItemIndex, 0, targetInnerItemId);
        } else if (addIndexType === 'last') {
          innerItemId.push(targetInnerItemId);
        } else if (addIndexType === 'first') {
          innerItemId.unshift(targetInnerItemId);
        } else {
          innerItemId.push(targetInnerItemId);
        }
      }
    },
    deleteCollectionInnerItem: (state, action) => {
      const { targetId, targetInnerId } = action.payload;
      const innerItemIDValue = state[targetId].innerItemID;
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
  deleteCollection,
  addCollectionInnerItem,
  deleteCollectionInnerItem,
} = slice.actions;
