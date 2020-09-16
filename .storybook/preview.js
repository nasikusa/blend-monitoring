import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';

import theme from '../src/styles/theme/MaterialUI/theme';

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#333333',
      },
      {
        name: 'white',
        value: '#ffffff',
      },
    ],
  },
};

export const decorators = [
  (Story) => {
    const muiThemeObject = theme;
    const MuiTheme = createMuiTheme(muiThemeObject);
    return (
      <MuiThemeProvider theme={MuiTheme}>
        <Story />
      </MuiThemeProvider>
    );
  },
];
