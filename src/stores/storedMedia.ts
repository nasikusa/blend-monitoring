import { createSlice } from '@reduxjs/toolkit';

import {
  getSampleImageURLObject,
  getSampleImageAspect,
  unsplashRawWidth,
} from '../utils/getSampleImages';

export type StoredMediaTypesType = 'image' | 'sequenceImages' | 'video';

export type DataTypesType = 'dataURL' | 'url' | 'objectURL' | 'blob' | 'file';

export type StoredMediaStateItemType = {
  mediaType: StoredMediaTypesType;
  dataType: DataTypesType;
  aspectRatio: number;
  createdAt?: number;
  updatedAt?: number;
  color?: {
    dominant: string;
    palette: string[];
  };
  mime: string;
  fileSize?: {
    raw: number;
    large: number;
    medium: number;
    small: number;
    thumb: number;
  };
  resource: {
    raw: string;
    large: string;
    medium: string;
    small: string;
    thumb: string;
  };
  rawWidth: number;
  rawHeight: number;
  isSelected: boolean;
  selectedOrder?: number;
  itemOrder: number;
};

export type StoredMediaStateType = {
  [key: string]: StoredMediaStateItemType;
};

export const imageSizeNames = ['thumb', 'small', 'medium', 'large', 'raw'];

const initialState: StoredMediaStateType = {
  sample0: {
    mediaType: 'image',
    dataType: 'url',
    aspectRatio: getSampleImageAspect(0),
    resource: getSampleImageURLObject(0),
    rawWidth: unsplashRawWidth,
    rawHeight: unsplashRawWidth * getSampleImageAspect(0),
    mime: `image/jpeg`,
    isSelected: false,
    itemOrder: 0,
  },
  sample1: {
    mediaType: 'image',
    dataType: 'url',
    aspectRatio: getSampleImageAspect(1),
    resource: getSampleImageURLObject(1),
    rawWidth: unsplashRawWidth,
    rawHeight: unsplashRawWidth * getSampleImageAspect(1),
    mime: `image/jpeg`,
    isSelected: false,
    itemOrder: 0,
  },
  sample2: {
    mediaType: 'image',
    dataType: 'url',
    aspectRatio: getSampleImageAspect(2),
    resource: getSampleImageURLObject(2),
    rawWidth: unsplashRawWidth,
    rawHeight: unsplashRawWidth * getSampleImageAspect(2),
    mime: `image/jpeg`,
    isSelected: false,
    itemOrder: 0,
  },
  sample3: {
    mediaType: 'image',
    dataType: 'url',
    aspectRatio: getSampleImageAspect(3),
    resource: getSampleImageURLObject(3),
    rawWidth: unsplashRawWidth,
    rawHeight: unsplashRawWidth * getSampleImageAspect(3),
    mime: `image/jpeg`,
    isSelected: false,
    itemOrder: 0,
  },
};

const slice = createSlice({
  name: 'storedMedia',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { blendChange } = slice.actions;
