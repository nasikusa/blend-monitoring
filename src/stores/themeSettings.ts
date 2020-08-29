import { createSlice } from '@reduxjs/toolkit';

export type ThemeSettingsType = {
  general: {
    backgroundColor: string;
  };
  header: {
    appBarHeight: string;
  };
  footer: {
    appBarHeight: string;
  };
  glEdit: {
    tabButtonHeight: string;
    createButtonHeight: string;
  };
  tooltip: {
    defaultEntryDelay: number;
  };
};

const initialState: ThemeSettingsType = {
  general: {
    backgroundColor: `#232323`,
  },
  header: {
    appBarHeight: `30px`,
  },
  footer: {
    appBarHeight: '20px',
  },
  glEdit: {
    tabButtonHeight: '60px',
    // createButtonHeight: '70px',
    createButtonHeight: '225px',
  },
  tooltip: {
    defaultEntryDelay: 1500,
  },
};

const slice = createSlice({
  name: 'themeSettings',
  initialState,
  reducers: {
    replaceAll: (state, action) => {
      const { newState } = action.payload;
      return {
        general: { ...newState.general },
        header: { ...newState.header },
        footer: { ...newState.footer },
        glEdit: { ...newState.glEdit },
        tooltip: { ...newState.tooltip },
      };
    },
  },
});

export default slice.reducer;

export const { replaceAll } = slice.actions;
