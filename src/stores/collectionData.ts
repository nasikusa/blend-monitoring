import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
// import randomColor from 'randomcolor';
// import red from '@material-ui/core/colors/red';

import { image02, image03 } from '../constants/temp/tempImageData';
import { BlendModesType } from '../constants/blendModeData';
import getOrderdBlendModeArray from '../utils/getOrderdBlendModeArray';
// import hueShades from '../constants/hueShades';

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
  collectionNumber?: number;
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
    image: image03,
    size: `cover`,
    imageWidth: 1277,
    imageHeight: 674,
  },
  {
    id: uuidv4(),
    visibility: true,
    innerItemLength: 4,
    innerItemId: uuidv4(),
    type: `singleImageMultiBlends`,
    collectionNumber: 1,
    opacity: 1.0,
    blendMode: `multiply`,
    color: null,
    image: image02,
    size: `cover`,
    imageWidth: 1024,
    imageHeight: 1024,
  },
  // {
  //   id: uuidv4(),
  //   visibility: true,
  //   innerItemId: [uuidv4(), uuidv4(), uuidv4()],
  //   type: `multiImages`,
  //   collectionNumber: 1,
  //   opacity: 1.0,
  //   blendMode: `multiply`,
  //   color: null,
  //   image: [
  //     image01,
  //     image02,
  //     'http://img.youtube.com/vi/ony539T074w/maxresdefault.jpg',
  //   ],
  //   size: `cover`,
  //   imageWidth: 1024,
  //   imageHeight: 1024,
  // },
  // {
  //   id: uuidv4(),
  //   innerItemId: [
  //     uuidv4(),
  //     uuidv4(),
  //     uuidv4(),
  //     uuidv4(),
  //     uuidv4(),
  //     uuidv4(),
  //     uuidv4(),
  //     uuidv4(),
  //     uuidv4(),
  //     uuidv4(),
  //   ],
  //   visibility: true,
  //   type: `multiColors`,
  //   collectionNumber: 2,
  //   opacity: 1.0,
  //   blendMode: 'overlay',
  //   color: randomColor({ hue: 'orange', count: 10 }),
  //   image: null,
  //   size: null,
  //   imageWidth: null,
  //   imageHeight: null,
  // },
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
} = slice.actions;
