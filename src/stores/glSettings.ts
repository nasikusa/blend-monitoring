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
  tooltipEnterDelayTime: number;
  isShowDocArea: boolean;
  resizeProcessJpegQuality: number;
};

/**
 * glSettingsの初期state
 */
const initialState: GlSettingsType = {
  itemCount: 4,
  maxItemCount: 14,
  minItemCount: 0,
  rowCount: 3,
  maxRowCount: 6,
  minRowCount: 1,
  singleItemWidth: 600,
  singleItemHeight: 400,
  singleItemAspect: 1.0,
  baseLayerDefaultColor: '#000000',
  collectionDefaultColor: '#000000',
  tooltipEnterDelayTime: 1000,
  isShowDocArea: false,
  resizeProcessJpegQuality: 0.8,
};

initialState.singleItemAspect =
  initialState.singleItemHeight / initialState.singleItemWidth;

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
