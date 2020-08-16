import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';

// import Top from './components/pages/Top';
import EditContainer from './container/EditContainer';
import FoundationStyle from './styles/foundation';

// import type '@material-ui/lab/themeAugmentation';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: teal[500],
    },
    secondary: {
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
  },
});

const emotionTheme = {
  colors: {
    primary: 'hotpink',
  },
};

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <EmotionThemeProvider theme={emotionTheme}>
          <DndProvider backend={HTML5Backend}>
            <FoundationStyle />
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={EditContainer} />
                <Route path="/edit" component={EditContainer} />
              </Switch>
            </BrowserRouter>
          </DndProvider>
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
