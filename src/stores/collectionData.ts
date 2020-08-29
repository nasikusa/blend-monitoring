import { createSlice } from '@reduxjs/toolkit';

import { BlendModesType } from '../constants/blendModeData';
import getOrderdBlendModeArray from '../utils/getOrderdBlendModeArray';

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
 * 複数の値( = 配列 )を取りうる単一のコレクションのプロパティの名前
 */
export type canCollectionMultiItemProps =
  | 'opacity'
  | 'blendMode'
  | 'color'
  | 'image';

export type collectionSizeValueType = 'cover' | 'normal' | 'contain';

/**
 * singleColorコレクションの型
 */
export type SingleColorGlCollectionType = {
  readonly id: string;
  readonly type: 'singleColor';
  readonly roughType: 'color';
  innerItemID: string;
  visibility: boolean;
  opacity: number | number[];
  blendMode: BlendModesType;
  color: string;
};

/**
 * singleColorMultiBlendsコレクションの型
 */
export type SingleColorMultiBlendsGlCollectionType = {
  readonly id: string;
  readonly type: 'singleColorMultiBlends';
  readonly roughType: 'color';
  innerItemID: string[];
  visibility: boolean;
  opacity: number | number[];
  blendMode: BlendModesType[];
  color: string;
};

/**
 * multiColorsコレクションの型
 */
export type MultiColorsGlCollectionType = {
  readonly id: string;
  readonly type: 'multiColors';
  readonly roughType: 'color';
  innerItemID: string[];
  visibility: boolean;
  opacity: number | number[];
  blendMode: BlendModesType;
  color: string[];
};

/**
 * singleImageコレクションの型
 */
export type SingleImageGlCollectionType = {
  readonly id: string;
  readonly type: 'singleImage';
  readonly roughType: 'image';
  innerItemID: string;
  visibility: boolean;
  opacity: number | number[];
  blendMode: BlendModesType;
  image: string;
  size: collectionSizeValueType;
};

export type SingleImageMultiBlendsGlCollectionType = {
  readonly id: string;
  readonly type: 'singleImageMultiBlends';
  readonly roughType: 'image';
  innerItemID: string[];
  visibility: boolean;
  opacity: number | number[];
  blendMode: BlendModesType[];
  image: string;
  size: collectionSizeValueType;
};

export type MultiImagesGlCollectionType = {
  readonly id: string;
  readonly type: 'multiImages';
  readonly roughType: 'image';
  innerItemID: string[];
  visibility: boolean;
  opacity: number | number[];
  blendMode: BlendModesType;
  image: string[];
  size: collectionSizeValueType;
};

export type BaseGlCollectionType = {
  readonly id: string;
  readonly type: 'base';
  readonly roughType: 'color';
  innerItemID: string;
  visibility: true;
  opacity: 1.0;
  blendMode: 'normal';
  color: string;
};

export type ColorRelatedGlCollectionType =
  | SingleColorGlCollectionType
  | SingleColorMultiBlendsGlCollectionType
  | MultiColorsGlCollectionType;

export type ImageRelatedGlCollectionType =
  | SingleImageGlCollectionType
  | SingleImageMultiBlendsGlCollectionType
  | MultiImagesGlCollectionType;

/**
 * 単一のコレクションのtype。
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
