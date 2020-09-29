/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IdType } from '../../types/collection/collectionData';

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
  innerItemId: string;
  readonly defaultColorId: string;
  readonly defaultBlendModeId: string;
};

/**
 * singleColorMultiBlendsコレクションの型
 */
export type SingleColorMultiBlendsCollectionCategoryType = BasicCollectionCategoryType & {
  readonly type: 'singleColorMultiBlends';
  readonly roughType: 'color';
  innerItemId: string[];
  readonly defaultColorId: string;
};

/**
 * multiColorsコレクションの型
 */
export type MultiColorsCollectionCategoryType = BasicCollectionCategoryType & {
  readonly type: 'multiColors';
  readonly roughType: 'color';
  innerItemId: string[];
  readonly defaultBlendModeId: string;
};

/**
 * singleImageコレクションの型
 */
export type SingleImageCollectionCategoryType = BasicCollectionCategoryType & {
  readonly type: 'singleImage';
  readonly roughType: 'image';
  innerItemId: string;
  readonly defaultImageId: string;
  readonly defaultBlendModeId: string;
};

/**
 * singleImageMultiBlendsのコレクションの型
 */
export type SingleImageMultiBlendsCollectionCategoryType = BasicCollectionCategoryType & {
  readonly type: 'singleImageMultiBlends';
  readonly roughType: 'image';
  innerItemId: string[];
  readonly defaultImageId: string;
};

export type MultiImagesCollectionCategoryType = BasicCollectionCategoryType & {
  readonly type: 'multiImages';
  readonly roughType: 'image';
  innerItemId: string[];
  readonly defaultBlendModeId: string;
};

export type BaseGlCollectionCategoryType = BasicCollectionCategoryType & {
  readonly type: 'base';
  readonly roughType: 'color';
  innerItemId: string;
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

const initialState: GlCollectionDictionaryType = {};

const slice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    addCollection: (
      state,
      { payload }: PayloadAction<CollectionCategoryType>
    ) => {
      const { id } = payload;
      state[id] = {
        ...payload,
      };
    },
    deleteCollection: (
      state,
      { payload }: PayloadAction<{ targetId: IdType }>
    ) => {
      const { targetId } = payload;
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
      const { innerItemId } = state[targetId];
      if (Array.isArray(innerItemId)) {
        if (targetInnerItemIndex != null && addIndexType === 'index') {
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
      const innerItemIDValue = state[targetId].innerItemId;
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
  addCollection,
  deleteCollection,
  addCollectionInnerItem,
  deleteCollectionInnerItem,
} = slice.actions;
