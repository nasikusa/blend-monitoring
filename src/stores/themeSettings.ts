import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  general: {
    backgroundColor: `#232323`,
  },
  header: {
    appBarHeight: `30px`,
  },
};

const slice = createSlice({
  name: 'themeSettings',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { blendChange } = slice.actions;
