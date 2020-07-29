import { createSlice } from "@reduxjs/toolkit";
import { image01, image02, image03 } from '../constants/temp/tempImageData';
import { readyBlendModeData , getBoolStateBlendObject } from '../utils/GetBlendModeData';
 
// Stateの初期状態
const initialState = [
    {
        type: `singleImage`,
        collectionNumber: 0,
        opacity: 1.0,
        blendMode: getBoolStateBlendObject(readyBlendModeData,[`normal`],false),
        color: null,
        image: image01,
    },
    {
        type: `singleImageMultiBlend`,
        collectionNumber: 1,
        opacity: 1.0,
        blendMode: getBoolStateBlendObject(readyBlendModeData,[`multiply`,`screen`,`overlay`,`colorBurn`],false),
        color: null,
        image: image02,
    },
];

// Sliceを生成する
const slice = createSlice({
  name: "collectionData",
  initialState,
  reducers: {
  },
});

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
// export const { blendChange } = slice.actions;