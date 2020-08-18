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
  glItemsBoxWidth: number;
  singleItemWidth: number;
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
  glItemsBoxWidth: 600,
  singleItemWidth: 600,
  singleItemAspect: 1.0,
  baseLayerDefaultColor: '#000000',
  collectionDefaultColor: '#000000',
  tooltipEnterDelayTime: 1000,
  isShowDocArea: false,
  resizeProcessJpegQuality: 0.8,
};

/**
 * toolkitを使用したスライス
 */
export const glSettingsSlice = createSlice({
  name: 'glSettings',
  initialState,
  reducers: {
    updateSingleItemSize: (state, action) => {
      const { glBoxClientWidth } = action.payload;
      if (glBoxClientWidth == null) {
        return {
          ...state,
        };
      }
      const singleItemWidth = Math.ceil(glBoxClientWidth / state.rowCount);
      return {
        ...state,
        glItemsBoxWidth: glBoxClientWidth,
        singleItemWidth,
      };
    },
    updateSingleItemAspect: (state, action) => {
      const { aspectValue } = action.payload;
      return {
        ...state,
        singleItemAspect: aspectValue,
      };
    },
  },
});

export default glSettingsSlice.reducer;

export const {
  updateSingleItemSize,
  updateSingleItemAspect,
} = glSettingsSlice.actions;
