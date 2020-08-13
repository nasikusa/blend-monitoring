import { createSlice } from '@reduxjs/toolkit';

import { BlendModesType } from '../constants/blendModeData';
import getOrderdBlendModeArray from '../utils/getOrderdBlendModeArray';

/**
 * コレクションの種類。
 */
export type CollectionTypeType =
  | `singleColor`
  | `singleColorMultiBlends`
  | `multiColors`
  | `singleImage`
  | `singleImageMultiBlends`
  | `multiImages`
  | `adjust`;

/**
 * 複数の値( = 配列 )を取りうる単一のコレクションのプロパティの名前
 */
export type canCollectionMultiItemProps =
  | 'opacity'
  | 'blendMode'
  | 'color'
  | 'image';

/**
 * 単一のコレクションのinterface。
 */
export interface GlCollectionInterface {
  id: string;
  innerItemId: string[] | string;
  visibility: boolean;
  type: CollectionTypeType;
  opacity: number | number[];
  blendMode: BlendModesType | BlendModesType[];
  color: null | string | string[];
  image: null | string | string[];
  size: null | 'normal' | 'cover' | 'contain';
}

export type updateBlendModePayloadType = {
  blendMode: any;
  glCollectionOrderKey: any;
  boolValue: any;
  blendModeOrder: any;
};

/**
 * 全コレクションのinterface。
 */
export type GlCollectionInterfaceArray = GlCollectionInterface[];

const initialState: GlCollectionInterfaceArray = [];

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
      const stateImageData = state[glCollectionOrderKey].image;
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
      if (Array.isArray(colorValue)) {
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

      if (typeof colorValue === 'string') {
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
} = slice.actions;
