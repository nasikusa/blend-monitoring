import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import Top from './components/pages/Top';
import EditContainer from './container/EditContainer';
import FoundationStyle from './styles/foundation';

// import type '@material-ui/lab/themeAugmentation';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: teal,
    secondary: {
      // main: '#e1ff39',
      main: '#F4FFB5',
    },
    success: {
      main: '#F4FFB5',
    },
  },
  typography: {
    fontSize: 12,
    fontFamily: ['"Noto Sans JP"', 'sans-serif'].join(','),
    button: {
      textTransform: 'none',
    },
  },
  props: {
    MuiList: {
      dense: true,
    },
    MuiCheckbox: {
      color: 'primary',
    },
    MuiRadio: {
      color: 'primary',
    },
    MuiSwitch: {
      color: 'primary',
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <FoundationStyle />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Top} />
            <Route path="/edit" component={EditContainer} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
