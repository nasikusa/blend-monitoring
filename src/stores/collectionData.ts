import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
    innerItemId: [uuidv4(), uuidv4(), uuidv4(), uuidv4()],
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
