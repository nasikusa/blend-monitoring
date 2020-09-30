import React from 'react';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  ThemeOptions,
} from '@material-ui/core/styles';
import theme from './theme';

export type Props = {
  children: React.ReactNode;
};

// #F4FFB5

const MaterialUIThemeProvider = (props: Props) => {
  const { children } = props;
  const muiThemeObject = theme as ThemeOptions;
  const MuiTheme = createMuiTheme(muiThemeObject);
  return <MuiThemeProvider theme={MuiTheme}>{children}</MuiThemeProvider>;
};

export default MaterialUIThemeProvider;
