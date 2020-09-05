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
 * singleColorコレクションの型
 */
export type SingleColorCollectionCategoryType = {
  readonly id: string;
  readonly type: 'singleColor';
  readonly roughType: 'color';
  innerItemID: string;
};

/**
 * singleColorMultiBlendsコレクションの型
 */
export type SingleColorMultiBlendsCollectionCategoryType = {
  readonly id: string;
  readonly type: 'singleColorMultiBlends';
  readonly roughType: 'color';
  innerItemID: string[];
};

/**
 * multiColorsコレクションの型
 */
export type MultiColorsCollectionCategoryType = {
  readonly id: string;
  readonly type: 'multiColors';
  readonly roughType: 'color';
  innerItemID: string[];
};

/**
 * singleImageコレクションの型
 */
export type SingleImageCollectionCategoryType = {
  readonly id: string;
  readonly type: 'singleImage';
  readonly roughType: 'image';
  innerItemID: string;
};

/**
 * singleImageMultiBlendsのコレクションの型
 */
export type SingleImageMultiBlendsCollectionCategoryType = {
  readonly id: string;
  readonly type: 'singleImageMultiBlends';
  readonly roughType: 'image';
  innerItemID: string[];
};

export type MultiImagesCollectionCategoryType = {
  readonly id: string;
  readonly type: 'multiImages';
  readonly roughType: 'image';
  innerItemID: string[];
};

export type BaseGlCollectionCategoryType = {
  readonly id: string;
  readonly type: 'base';
  readonly roughType: 'color';
  innerItemID: string;
};

export type ColorRelatedCollectionCategoryType =
  | SingleColorCollectionCategoryType
  | SingleColorMultiBlendsCollectionCategoryType
  | MultiColorsCollectionCategoryType;

export type ImageRelatedCollectionCategoryType =
  | SingleImageCollectionCategoryType
  | SingleImageMultiBlendsCollectionCategoryType
  | MultiImagesCollectionCategoryType;

export type SingleChildCollectionCategoryType =
  | SingleColorCollectionCategoryType
  | SingleImageCollectionCategoryType;

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
  reducers: {},
});

export default slice.reducer;

// export const { stockAddColor, stockRemoveColor, replaceAll } = slice.actions;
