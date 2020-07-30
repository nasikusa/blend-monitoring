import { createSlice } from '@reduxjs/toolkit';
import { image01, image02 } from '../constants/temp/tempImageData';

import { BlendModesType } from '../constants/blendModeData';

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
 * 単一のコレクションのinterface。
 * @todo: 画像関連のプロパティはtempです。storedImagesなどに移行したい。
 */
export interface GlCollectionInterface {
  type: CollectionTypeType;
  collectionNumber: number;
  opacity: number | number[];
  blendMode: BlendModesType | BlendModesType[];
  color: string | string[];
  image: string | string[];
  size: 'normal' | 'cover' | 'contain';
  imageWidth: number;
  imageHeight: number;
}

/**
 * 全コレクションのinterface。
 */
export type GlCollectionInterfaceArray = GlCollectionInterface[];

const initialState = [
  {
    type: `singleImage`,
    collectionNumber: 0,
    opacity: 1.0,
    blendMode: 'normal',
    color: null,
    image: image01,
    size: `cover`,
    imageWidth: 1024,
    imageHeight: 1024,
  },
  {
    type: `singleImageMultiBlends`,
    collectionNumber: 1,
    opacity: 1.0,
    blendMode: [`multiply`, `screen`, `overlay`, `colorBurn`],
    color: null,
    image: image02,
    size: `cover`,
    imageWidth: 1024,
    imageHeight: 1024,
  },
];

const slice = createSlice({
  name: 'collectionData',
  initialState,
  reducers: {
    updateBlendMode: (state) => {
      console.log(state);
      // const { blendMode, boolValue } = action.payload;
      return {
        ...state,
        // blendMode:
      };
    },
  },
});

export default slice.reducer;

export const { updateBlendMode } = slice.actions;
