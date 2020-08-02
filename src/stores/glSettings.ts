import { createSlice } from '@reduxjs/toolkit';

export type GlSettingsType = {
  itemCount: number;
  maxItemCount: number;
  minItemCount: number;
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
  itemCount: 4,
  maxItemCount: 15,
  minItemCount: 0,
  rowCount: 3,
  maxRowCount: 6,
  minRowCount: 1,
  singleItemWidth: 300, // temp
  singleItemHeight: 300, // temp
  singleItemAspect: 1.0, // temp
};

initialState.singleItemAspect =
  initialState.singleItemWidth / initialState.singleItemHeight;

/**
 * toolkitを使用したスライス
 */
export const glSettingsSlice = createSlice({
  name: 'glSettings',
  initialState,
  reducers: {
    updateSingleItemSize: (state, action) => {
      const { glBoxClientWidth } = action.payload;
      const singleItemWidth = Math.ceil(glBoxClientWidth / state.rowCount) - 1;
      const singleItemHeight = singleItemWidth * state.singleItemAspect;
      return {
        ...state,
        singleItemWidth,
        singleItemHeight,
      };
    },
  },
});

export default glSettingsSlice.reducer;

export const { updateSingleItemSize } = glSettingsSlice.actions;
