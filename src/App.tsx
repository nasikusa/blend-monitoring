import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import Top from './components/pages/Top';
import EditContainer from './container/EditContainer';
import FoundationStyle from './styles/foundation';

const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: teal,
      secondary: cyan,
    },
    typography: {
      fontSize: 12,
      fontFamily: [
        '"Noto Sans JP"',
        'sans-serif',
      ].join(','),
      button: {
        textTransform: "none"
      },
    },
    props: {
      MuiList: {
          dense: true,
      },
      MuiCheckbox: {
        color: "primary"
      },
      MuiRadio: {
          color: "primary"
      },
      MuiSwitch: {
          color: "primary"
      },
    }
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
