import { createSlice } from '@reduxjs/toolkit';

export type ThemeSettingsType = {
  general: {
    backgroundColor: string;
  };
  header: {
    appBarHeight: string;
  };
  glEdit: {
    tabButtonHeight: string;
  };
};

const initialState: ThemeSettingsType = {
  general: {
    backgroundColor: `#232323`,
  },
  header: {
    appBarHeight: `30px`,
  },
  glEdit: {
    tabButtonHeight: '72px',
  },
};

const slice = createSlice({
  name: 'themeSettings',
  initialState,
  reducers: {},
});

export default slice.reducer;

// export const { blendChange } = slice.actions;
