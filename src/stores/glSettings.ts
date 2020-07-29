import { createSlice } from "@reduxjs/toolkit";
// Stateの初期状態
const initialState: any = {
    rowCount: 3,
    maxRowCount: 6,
    minRowCount: 1,
    singleItemWidth: 300, // temp
    singleItemHeight: 300, // temp
    singleItemAspect: 1.0, // temp
}
// Sliceを生成する
const slice = createSlice({
  name: "glSettings",
  initialState,
  reducers: {
    updateSingleItemSize: (state,action) => {
      const glBoxClientWidth = action.payload.glBoxClientWidth;
      const singleItemWidth = Math.ceil(glBoxClientWidth / state.rowCount) -1;
      const singleItemHeight = singleItemWidth * state.singleItemAspect;
      return {
        ...state,
        singleItemWidth,
        singleItemHeight
      };
    },
  },
});

// Reducerをエクスポートする
export default slice.reducer;

// Action Creatorsをエクスポートする
export const { updateSingleItemSize } = slice.actions;