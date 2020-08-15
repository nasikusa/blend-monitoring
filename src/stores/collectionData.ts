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
  | `adjust`
  | 'base';

/**
 * 複数の値( = 配列 )を取りうる単一のコレクションのプロパティの名前
 */
export type canCollectionMultiItemProps =
  | 'opacity'
  | 'blendMode'
  | 'color'
  | 'image';

export type collectionSizeValueType = 'cover' | 'normal' | 'contain';

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

// | BaseGlCollectionType;

// export type GlCollectionType = {
//   id: string;
//   innerItemId: string[] | string;
//   visibility: boolean;
//   type: CollectionTypeType;
//   opacity: number | number[];
//   blendMode: BlendModesType | BlendModesType[];
//   color: null | string | string[];
//   image: null | string | string[];
//   size: null | collectionSizeValueType;
// };

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

const initialState: GlCollectionTypeArray = [
  // {
  //   id: uuidv4(),
  //   innerItemID: uuidv4(),
  //   visibility: true,
  //   type: 'singleColor',
  //   roughType: 'color',
  //   opacity: 1.0,
  //   blendMode: 'normal',
  //   color: '#000000',
  // },
];

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
