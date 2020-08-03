import { createSlice } from '@reduxjs/toolkit';
import { readyBlendModeArray } from '../utils/GetBlendModeData';

const initialState: string[] = [
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
    blendChange: () => {},
  },
});

export default slice.reducer;

// export const { blendChange } = slice.actions;
