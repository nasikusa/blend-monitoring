import { createSlice } from "@reduxjs/toolkit";
import { image01, image02, image03 } from '../constants/temp/tempImageData';

const initialState = [
    {
        type: `dataURL`,
        imageID: 0,
        source: image01,
        originalWidth: 469,
        originalHeight: 463,
        aspect: 1.0,
        mime: `image/jpeg`,
        fileSize: null,
    },
    {
        type: `dataURL`,
        imageID: 1,
        source: image02,
        originalWidth: 1024,
        originalHeight: 1024,
        aspect: 1.0,
        mime: `image/jpeg`,
        fileSize: null,
    },
    {
        type: `dataURL`,
        imageID: 2,
        source: image03,
        originalWidth: 1024,
        originalHeight: 640,
        aspect: null,
        mime: `image/jpeg`,
        fileSize: null,
    },
];

const slice = createSlice({
  name: "collectionData",
  initialState,
  reducers: {
  },
});

export default slice.reducer;

// export const { blendChange } = slice.actions;