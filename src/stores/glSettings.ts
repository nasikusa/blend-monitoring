import { createSlice } from '@reduxjs/toolkit';

export type GlSettingsType = {
  rowCount: number;
  maxRowCount: number;
  minRowCount: number;
  singleItemWidth: number;
  singleItemHeight: number;
  singleItemAspect: number;
};

/**
 * glSettingsの初期state
 */
const initialState: GlSettingsType = {
  rowCount: 3,
  maxRowCount: 6,
  minRowCount: 1,
  singleItemWidth: 300, // temp
  singleItemHeight: 300, // temp
  singleItemAspect: 1.0, // temp
};

/**
 * toolkitを使用したスライス
 */
const slice = createSlice({
  name: 'glSettings',
  initialState,
  reducers: {
    updateSingleItemSize: () =>
      // state = initialState,
      // action: PayloadAction<number>
      {
        // console.log('!!!');
        // const { glBoxClientWidth } = action.payload;
        // const singleItemWidth = Math.ceil(glBoxClientWidth / state.rowCount) - 1;
        // const singleItemHeight = singleItemWidth * state.singleItemAspect;
        // return {
        //   ...state,
        //   singleItemWidth,
        //   singleItemHeight,
        // };
      },
  },
});

export default slice.reducer;

export const { updateSingleItemSize } = slice.actions;
