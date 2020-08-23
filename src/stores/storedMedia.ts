import { createSlice } from '@reduxjs/toolkit';

// import createStoredMediaInitialState from '../utils/develop/createStoredMediaInitialState';

export type StoredMediaTypesType = 'image' | 'sequenceImages' | 'video';

export type DataTypesType = 'dataURL' | 'url' | 'objectURL' | 'blob' | 'file';

export type StoredMediaStateItemType = {
  id: string;
  name: string;
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

// const initialState: StoredMediaStateType = createStoredMediaInitialState(
//   10,
//   false
// );
const initialState: StoredMediaStateType = {};

const slice = createSlice({
  name: 'storedMedia',
  initialState,
  reducers: {
    addMediaData: (state, action) => {
      const { newMediaDataObject } = action.payload;
      const newMediaID = newMediaDataObject.id;
      return {
        ...state,
        [newMediaID]: {
          ...newMediaDataObject,
          resource: {
            ...newMediaDataObject.resource,
          },
        },
      };
    },
  },
});

export default slice.reducer;

export const { addMediaData } = slice.actions;
