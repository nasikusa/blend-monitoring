import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    rowCount: 3,
    maxRowCount: 6,
    minRowCount: 1,
    singleItemWidth: 300, // temp
    singleItemHeight: 300, // temp
    singleItemAspect: 1.0, // temp
}
const slice = createSlice({
  name: "glSettings",
  initialState,
  reducers: {
    updateSingleItemSize: (state,action) => {
      const {glBoxClientWidth} = action.payload;
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

export default slice.reducer;

export const { updateSingleItemSize } = slice.actions;