import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { image01, image02 } from '../constants/temp/tempImageData';
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
 * @todo: 画像関連のプロパティはtempです。storedImagesなどに移行したい。
 */
export interface GlCollectionInterface {
  id: string;
  innerItemId: string[] | string;
  innerItemLength?: number;
  visibility: boolean;
  type: CollectionTypeType;
  collectionNumber: number;
  opacity: number | number[];
  blendMode: BlendModesType | BlendModesType[];
  color: null | string | string[];
  image: null | string | string[];
  size: null | 'normal' | 'cover' | 'contain';
  imageWidth: null | number;
  imageHeight: null | number;
}

/**
 * 全コレクションのinterface。
 */
export type GlCollectionInterfaceArray = GlCollectionInterface[];

const initialState: GlCollectionInterfaceArray = [
  {
    id: uuidv4(),
    innerItemId: uuidv4(),
    innerItemLength: 1,
    visibility: true,
    type: `singleImage`,
    collectionNumber: 0,
    opacity: 1.0,
    blendMode: 'normal',
    color: null,
    image: image01,
    size: `normal`,
    imageWidth: 1024,
    imageHeight: 1024,
  },
  {
    id: uuidv4(),
    visibility: true,
    innerItemLength: 4,
    innerItemId: [uuidv4(), uuidv4(), uuidv4()],
    type: `singleImageMultiBlends`,
    collectionNumber: 1,
    opacity: 1.0,
    blendMode: [`multiply`, 'screen', 'colorBurn'],
    color: null,
    image: image02,
    size: `cover`,
    imageWidth: 1024,
    imageHeight: 1024,
  },
  // {
  //   id: uuidv4(),
  //   visibility: true,
  //   type: `multiImages`,
  //   collectionNumber: 1,
  //   opacity: 1.0,
  //   blendMode: `multiply`,
  //   color: null,
  //   image: [image01, image02, image03],
  //   size: `cover`,
  //   imageWidth: 1024,
  //   imageHeight: 1024,
  // },
  {
    id: uuidv4(),
    innerItemId: uuidv4(),
    visibility: true,
    type: `singleColor`,
    collectionNumber: 2,
    opacity: 1.0,
    blendMode: 'overlay',
    color: '#00ff00',
    image: null,
    size: null,
    imageWidth: null,
    imageHeight: null,
  },
];

const slice = createSlice({
  name: 'collectionData',
  initialState,
  reducers: {
    updateBlendMode: (state, action) => {
      const {
        blendMode,
        glCollectionOrderKey,
        boolValue,
        blendModeOrder,
      } = action.payload;
      const stateBlendModeData = state[glCollectionOrderKey].blendMode;

      if (Array.isArray(stateBlendModeData)) {
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

      return {
        ...state,
      };
    },
    updateOpacity: (state, action) => {
      console.log(action.payload);
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
      console.log(colorValue);
      if (Array.isArray(colorValue)) {
        return {
          ...state,
        };
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
        console.log(resultCollectionData);
        return resultCollectionData;
      }

      return {
        ...state,
      };
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
} = slice.actions;
