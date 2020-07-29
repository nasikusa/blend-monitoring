import { createSlice } from "@reduxjs/toolkit";
import { image01, image02, image03 } from '../constants/temp/tempImageData';

// Stateの初期状態
const initialState = {
    general: {
        backgroundColor: `#232323`,
    },
    header: {
        appBarHeight: `30px`,
    }
}

// Sliceを生成する
const slice = createSlice({
  name: "themeSettings",
  initialState,
  reducers: {
  },
});

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
// export const { blendChange } = slice.actions;