/* eslint-disable import/no-unresolved */
import { collectionValueOpacityDictionaryType } from 'stores/collection/collectionValueOpacity';
import { collectionValueImageDictionaryType } from 'stores/collection/collectionValueImage';
import { collectionValueColorDictionaryType } from 'stores/collection/collectionValueColor';
import { collectionValueVisibilityDictionaryType } from 'stores/collection/collectionValueVisibility';
import { collectionValueBlendModeDictionaryType } from 'stores/collection/collectionValueBlendMode';
import {
  DenormalizedColorCollectionItemType,
  DenormalizedImageCollectionItemType,
  DenormalizedCollectionItemType,
} from 'utils/denormalize/denormalizeCollectionItem';
/* eslint-enable import/no-unresolved */

/**
 * コレクションアイテムの値の方のunion
 */
export type collectionItemValueDictionaryType =
  | collectionValueOpacityDictionaryType
  | collectionValueImageDictionaryType
  | collectionValueColorDictionaryType
  | collectionValueVisibilityDictionaryType
  | collectionValueBlendModeDictionaryType;

/**
 * コレクションデータのIDの値の型
 */
export type IdType = string;

/**
 * 単一アイテムのコレクションの種類
 */
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

export type CollectionRoughTypeType = 'color' | 'image';

/**
 * 複数の値( = 配列 )を取りうる単一のコレクションのプロパティの名前
 */
export type CanCollectionMultiItemProps =
  | 'opacity'
  | 'blendMode'
  | 'color'
  | 'image';

/**
 * 画像の描画アイテムとのサイズ合わせの設定
 */
export type CollectionSizeValueType = 'cover' | 'normal' | 'contain';

/**
 * collectionItemからcollectionデータを作成する際に、collectionItemから引き継がないプロパティの設定
 */
export type IgnoreCollectionItemType = 'id' | 'type';

/**
 * innerItemIdを一つのみ持つコレクションデータのコレクションアイテムから来るデータを正規化したデータの型
 * Uの箇所で不要なプロパティを弾いている。(id,typeなど)
 */
export type SingleChildGlCollectionInnerItemType<
  T extends DenormalizedCollectionItemType,
  U extends keyof T
> = {
  [K in keyof Omit<T, U>]: Omit<T, U>[K];
};
/**
 * innerItemIdを複数持つ可能性のあるコレクションデータのコレクションアイテムから来るデータを正規化したデータの型
 * Uの箇所で不要なプロパティを弾いている。(id,typeなど)
 */
export type MultipleChildGlCollectionInnerItemType<
  T extends DenormalizedCollectionItemType,
  U extends keyof T
> = {
  [K in keyof Omit<T, U>]: Omit<T, U>[K][];
};

export type RootGlCollectionType = {
  readonly id: string;
  readonly type: CollectionTypeType;
  readonly roughType: CollectionRoughTypeType;
  innerItemId: IdType | IdType[];
};

/**
 * singleColorコレクションの型
 */
export type SingleColorGlCollectionType = RootGlCollectionType & {
  readonly type: 'singleColor';
  readonly roughType: 'color';
  innerItemId: IdType;
} & SingleChildGlCollectionInnerItemType<
    DenormalizedColorCollectionItemType,
    IgnoreCollectionItemType
  >;

/**
 * singleColorMultiBlendsコレクションの型
 */
export type SingleColorMultiBlendsGlCollectionType = RootGlCollectionType & {
  readonly id: string;
  readonly type: 'singleColorMultiBlends';
  readonly roughType: 'color';
  innerItemId: string[];
} & MultipleChildGlCollectionInnerItemType<
    DenormalizedColorCollectionItemType,
    IgnoreCollectionItemType
  >;

/**
 * multiColorsコレクションの型
 */
export type MultiColorsGlCollectionType = RootGlCollectionType & {
  readonly id: string;
  readonly type: 'multiColors';
  readonly roughType: 'color';
  innerItemId: string[];
} & MultipleChildGlCollectionInnerItemType<
    DenormalizedColorCollectionItemType,
    IgnoreCollectionItemType
  >;

/**
 * singleImageコレクションの型
 */
export type SingleImageGlCollectionType = RootGlCollectionType & {
  readonly type: 'singleImage';
  readonly roughType: 'image';
  innerItemId: IdType;
} & SingleChildGlCollectionInnerItemType<
    DenormalizedImageCollectionItemType,
    IgnoreCollectionItemType
  >;

/**
 * singleImageMultiBlendsのコレクションの型
 */
export type SingleImageMultiBlendsGlCollectionType = RootGlCollectionType & {
  readonly id: string;
  readonly type: 'singleImageMultiBlends';
  readonly roughType: 'image';
  innerItemId: string[];
} & MultipleChildGlCollectionInnerItemType<
    DenormalizedImageCollectionItemType,
    IgnoreCollectionItemType
  >;

/**
 * multiImagesのコレクションの型
 */
export type MultiImagesGlCollectionType = RootGlCollectionType & {
  readonly id: string;
  readonly type: 'multiImages';
  readonly roughType: 'image';
  innerItemId: string[];
} & MultipleChildGlCollectionInnerItemType<
    DenormalizedImageCollectionItemType,
    IgnoreCollectionItemType
  >;

/**
 * baseのコレクションの型
 */
export type BaseGlCollectionType = RootGlCollectionType & {
  readonly type: 'base';
  readonly roughType: 'color';
  innerItemId: IdType;
} & SingleChildGlCollectionInnerItemType<
    DenormalizedColorCollectionItemType,
    IgnoreCollectionItemType
  > & {
    opacity: 1.0;
    blendMode: 'normal';
    visibility: true;
  };

/**
 * カラーに関係したコレクションの型
 */
export type ColorRelatedGlCollectionType =
  | SingleColorGlCollectionType
  | SingleColorMultiBlendsGlCollectionType
  | MultiColorsGlCollectionType;

/**
 * 画像に関係したコレクションの型
 */
export type ImageRelatedGlCollectionType =
  | SingleImageGlCollectionType
  | SingleImageMultiBlendsGlCollectionType
  | MultiImagesGlCollectionType;

/**
 * innerIdが一つのみのコレクションの型
 */
export type SingleChildGlCollectionType =
  | SingleColorGlCollectionType
  | SingleImageGlCollectionType;
/**
 * innerIdが複数あるコレクションの型
 */
export type MultipleChildGlCollectionType =
  | SingleColorMultiBlendsGlCollectionType
  | MultiColorsGlCollectionType
  | SingleImageMultiBlendsGlCollectionType
  | MultiImagesGlCollectionType;

/**
 * 単一のコレクションの型
 */
export type GlCollectionType =
  | ColorRelatedGlCollectionType
  | ImageRelatedGlCollectionType;

/**
 * 全コレクションのinterface。
 */
export type GlCollectionTypeArray = GlCollectionType[];
