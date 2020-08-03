import { createSlice } from '@reduxjs/toolkit';

/**
 * glSettingsストアの初期stateの型
 */
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
  baseLayerDefaultColor: string;
  collectionDefaultColor: string;
};

/**
 * glSettingsの初期state
 */
const initialState: GlSettingsType = {
  itemCount: 4,
  maxItemCount: 15,
  minItemCount: 0,
  rowCount: 4,
  maxRowCount: 6,
  minRowCount: 1,
  singleItemWidth: 300,
  singleItemHeight: 300,
  singleItemAspect: 1.0,
  baseLayerDefaultColor: '#000000',
  collectionDefaultColor: '#000000',
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
