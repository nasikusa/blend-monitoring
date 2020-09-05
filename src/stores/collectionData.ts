import { createSlice } from '@reduxjs/toolkit';

import getOrderdBlendModeArray from '../utils/getOrderdBlendModeArray';
import { collectionItemValueOpacityDictionaryType } from './collectionValueOpacity';
import { collectionItemValueImageDictionaryType } from './collectionValueImage';
import { collectionItemValueColorDictionaryType } from './collectionValueColor';
import { collectionItemValueVisibilityDictionaryType } from './collectionValueVisibility';
import { collectionItemValueBlendModeDictionaryType } from './collectionValueBlendMode';
import {
  DenormalizedColorCollectionItemType,
  DenormalizedImageCollectionItemType,
  DenormalizedCollectionItemType,
} from '../utils/denormalizeCollectionItem';

/**
 * コレクションアイテムの値の方のunion
 */
export type collectionItemValueDictionaryType =
  | collectionItemValueOpacityDictionaryType
  | collectionItemValueImageDictionaryType
  | collectionItemValueColorDictionaryType
  | collectionItemValueVisibilityDictionaryType
  | collectionItemValueBlendModeDictionaryType;

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
  innerItemID: IdType | IdType[];
};

/**
 * singleColorコレクションの型
 */
export type SingleColorGlCollectionType = RootGlCollectionType & {
  readonly type: 'singleColor';
  readonly roughType: 'color';
  innerItemID: IdType;
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
  innerItemID: string[];
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
  innerItemID: string[];
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
  innerItemID: IdType;
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
  innerItemID: string[];
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
  innerItemID: string[];
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
  innerItemID: IdType;
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

export type updateBlendModePayloadType = {
  blendMode: any;
  glCollectionOrderKey: any;
  boolValue: any;
  blendModeOrder: any;
};

/**
 * 全コレクションのinterface。
 */
export type GlCollectionTypeArray = GlCollectionType[];

const initialState: GlCollectionTypeArray = [];

const slice = createSlice({
  name: 'collectionData',
  initialState,
  reducers: {
    updateBlendMode: (
      state,
      action: {
        type: string;
        payload: updateBlendModePayloadType;
      }
    ) => {
      const {
        blendMode,
        glCollectionOrderKey,
        boolValue,
        blendModeOrder,
      } = action.payload;

      /**
       * まだ更新されていないコレクションの描画モードデータ
       */
      const stateBlendModeData = state[glCollectionOrderKey].blendMode;

      if (Array.isArray(stateBlendModeData)) {
        /**
         * 新しい描画モードの配列
         */
        let newBlendModeValue: string[] = [];
        if (boolValue === false) {
          newBlendModeValue = stateBlendModeData.filter(
            (stateSingleBlendModeValue) => {
              return stateSingleBlendModeValue !== blendMode;
            }
          );
        } else if (boolValue === true) {
          newBlendModeValue = [...stateBlendModeData, blendMode];
        }

        newBlendModeValue = getOrderdBlendModeArray(
          newBlendModeValue,
          blendModeOrder
        );

        return state.map((singleCollectionData, currentIndex) => {
          if (currentIndex === glCollectionOrderKey) {
            return {
              ...singleCollectionData,
              blendMode: newBlendModeValue,
            };
          }
          return singleCollectionData;
        });
      }

      if (typeof stateBlendModeData === 'string') {
        const newBlendModeValue = blendMode;
        return state.map((singleCollectionData, currentIndex) => {
          if (currentIndex === glCollectionOrderKey) {
            return {
              ...singleCollectionData,
              blendMode: newBlendModeValue,
            };
          }
          return singleCollectionData;
        });
      }

      return [...state];
    },
    updateImages: (state, action) => {
      const { imageID, glCollectionOrderKey, boolValue } = action.payload;
      const targetStateItemData = state[glCollectionOrderKey];
      const stateImageData =
        targetStateItemData.roughType === 'image'
          ? targetStateItemData.image
          : null;
      if (Array.isArray(stateImageData)) {
        /**
         * 新しい画像データIDの配列
         */
        let newImageValue: string[] = [];
        if (boolValue === false) {
          newImageValue = stateImageData.filter((stateSingleImageValue) => {
            return stateSingleImageValue !== imageID;
          });
        } else if (boolValue === true) {
          newImageValue = [...stateImageData, imageID];
        }

        return state.map((singleCollectionData, currentIndex) => {
          if (currentIndex === glCollectionOrderKey) {
            return {
              ...singleCollectionData,
              image: newImageValue,
            };
          }
          return singleCollectionData;
        });
      }

      if (typeof stateImageData === 'string' || stateImageData === null) {
        const newImageValue = imageID;
        return state.map((singleCollectionData, currentIndex) => {
          if (currentIndex === glCollectionOrderKey) {
            return {
              ...singleCollectionData,
              image: newImageValue,
            };
          }
          return singleCollectionData;
        });
      }

      return [...state];
    },
    updateOpacity: (state, action) => {
      const { opacityValue, glCollectionOrderKey } = action.payload;
      return state.map((singleCollectionData, currentIndex) => {
        if (currentIndex === glCollectionOrderKey) {
          return {
            ...singleCollectionData,
            opacity: opacityValue,
          };
        }
        return singleCollectionData;
      });
    },
    deleteSingleCollection: (state, action) => {
      const { deleteCollectionNumber } = action.payload;
      return state.filter((singleCollectionData, currentIndex) => {
        if (currentIndex !== deleteCollectionNumber) {
          return singleCollectionData;
        }
        return null;
      });
    },
    updateVisibility: (
      state,
      action: {
        type: string;
        payload: {
          visibilityBoolValue: boolean;
          glCollectionOrderKey: number;
        };
      }
    ) => {
      const { visibilityBoolValue, glCollectionOrderKey } = action.payload;
      return state.map((singleCollectionData, currentIndex) => {
        if (currentIndex === glCollectionOrderKey) {
          return {
            ...singleCollectionData,
            visibility: visibilityBoolValue,
          };
        }
        return singleCollectionData;
      });
    },
    updateColor: (state, action) => {
      const { colorValue, glCollectionOrderKey } = action.payload;
      const targetStateItemData = state[glCollectionOrderKey];
      const stateColorData =
        targetStateItemData.roughType === 'color'
          ? targetStateItemData.color
          : null;

      if (
        Array.isArray(colorValue) &&
        Array.isArray(stateColorData) &&
        targetStateItemData.type === 'multiColors'
      ) {
        const resultCollectionData = state.map(
          (singleCollectionData, currentIndex) => {
            if (currentIndex === glCollectionOrderKey) {
              return {
                ...singleCollectionData,
                color: colorValue.map((val) => val),
              };
            }
            return singleCollectionData;
          }
        );
        return resultCollectionData;
      }

      if (
        (typeof colorValue === 'string' &&
          typeof stateColorData === 'string' &&
          targetStateItemData.type === 'singleColor') ||
        targetStateItemData.type === 'singleColorMultiBlends'
      ) {
        const resultCollectionData = state.map(
          (singleCollectionData, currentIndex) => {
            if (currentIndex === glCollectionOrderKey) {
              return {
                ...singleCollectionData,
                color: colorValue,
              };
            }
            return singleCollectionData;
          }
        );
        return resultCollectionData;
      }

      return state.map((singleCollectionData) => {
        return {
          ...singleCollectionData,
        };
      });
    },
    createCollection: (state, action) => {
      const { collectionDataObject, targetCollectionOrder } = action.payload;
      const adjustTargetCollectionOrder = (() => {
        if (targetCollectionOrder != null) {
          return targetCollectionOrder;
        }
        return state.length;
      })();

      const blendMode = Array.isArray(collectionDataObject.blendMode)
        ? [...collectionDataObject.blendMode]
        : collectionDataObject.blendMode;
      const color = Array.isArray(collectionDataObject.color)
        ? [...collectionDataObject.color]
        : collectionDataObject.color;
      const image = Array.isArray(collectionDataObject.image)
        ? [...collectionDataObject.image]
        : collectionDataObject.image;
      const opacity = Array.isArray(collectionDataObject.opacity)
        ? [...collectionDataObject.opacity]
        : collectionDataObject.opacity;
      const innerItemId = Array.isArray(collectionDataObject.innerItemId)
        ? [...collectionDataObject.innerItemId]
        : collectionDataObject.innerItemId;

      return [
        ...state.slice(0, adjustTargetCollectionOrder),
        {
          ...collectionDataObject,
          blendMode,
          color,
          image,
          opacity,
          innerItemId,
        },
        ...state.slice(adjustTargetCollectionOrder),
      ];
    },
    removeAll: () => {
      return [...initialState];
    },
    // @ts-ignore
    replaceAll: (
      state,
      action: {
        type: string;
        payload: {
          newState: GlCollectionTypeArray;
        };
      }
    ) => {
      const { newState } = action.payload;
      // eslint-disable-next-line
      return newState.map((singleCollectionData) => {
        switch (singleCollectionData.type) {
          case 'singleColor':
          case 'singleImage':
            return {
              ...singleCollectionData,
              opacity: Array.isArray(singleCollectionData.opacity)
                ? [...singleCollectionData.opacity]
                : singleCollectionData.opacity,
            };
          case 'singleColorMultiBlends':
          case 'singleImageMultiBlends':
            return {
              ...singleCollectionData,
              blendMode: [...singleCollectionData.blendMode],
              opacity: Array.isArray(singleCollectionData.opacity)
                ? [...singleCollectionData.opacity]
                : singleCollectionData.opacity,
            };
          case 'multiColors':
            return {
              ...singleCollectionData,
              color: [...singleCollectionData.color],
              opacity: Array.isArray(singleCollectionData.opacity)
                ? [...singleCollectionData.opacity]
                : singleCollectionData.opacity,
            };
          case 'multiImages':
            return {
              ...singleCollectionData,
              image: [...singleCollectionData.image],
              opacity: Array.isArray(singleCollectionData.opacity)
                ? [...singleCollectionData.opacity]
                : singleCollectionData.opacity,
            };
          default:
            break;
        }
      });
    },
  },
});

export default slice.reducer;

export const {
  updateBlendMode,
  updateOpacity,
  deleteSingleCollection,
  updateVisibility,
  updateColor,
  createCollection,
  updateImages,
  replaceAll,
  removeAll,
} = slice.actions;
