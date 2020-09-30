import { createSlice } from '@reduxjs/toolkit';
import { readyBlendModeArray } from '../../utils/blendMode/getBlendModeData';
import { BlendModesType } from '../../constants/blendMode/blendModeData';

const initialState: BlendModesType[] = [
  'normal',
  ...readyBlendModeArray
    .filter((val) => val.type.brightness === '-')
    .map((val) => val.mode),
  ...readyBlendModeArray
    .filter((val) => val.type.brightness === '+-')
    .map((val) => val.mode),
  ...readyBlendModeArray
    .filter((val) => val.type.brightness === '+')
    .map((val) => val.mode),
  ...readyBlendModeArray
    .filter((val) => val.type.base === 'math')
    .map((val) => val.mode),
];

const slice = createSlice({
  name: 'blendModeOrder',
  initialState,
  reducers: {
    replaceAll: (state, action) => {
      const { newState } = action.payload;
      return [...newState];
    },
  },
});

export default slice.reducer;

export const { replaceAll } = slice.actions;
