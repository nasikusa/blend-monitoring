import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import Box from '@material-ui/core/Box';

import EditContainer from './container/EditContainer';
import FoundationStyle from './styles/foundation';
import { beforeRenderingScreenID } from './constants/domNames';
import MaterialUIThemeProvider from './styles/theme/MaterialUIThemeProvider';
import EmotionTheme from './styles/theme/emotion';
import { isSatisfied } from './constants/userEnv';
import UnSatisfiedEnv from './components/pages/UnSatisfiedEnv';

/**
 * アプリのルートとなるコンポーネント
 */
function App() {
  // レンダリング前スクリーンのマウント後削除
  useEffect(() => {
    const beforeRenderingScreenElement = document.getElementById(
      beforeRenderingScreenID
    );
    if (beforeRenderingScreenElement != null) {
      beforeRenderingScreenElement.style.display = 'none';
    }
  }, []);

  return isSatisfied ? (
    <Box className="App">
      <MaterialUIThemeProvider>
        <EmotionThemeProvider theme={EmotionTheme}>
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
      </MaterialUIThemeProvider>
    </Box>
  ) : (
    <Box className="App">
      <MaterialUIThemeProvider>
        <UnSatisfiedEnv />
      </MaterialUIThemeProvider>
    </Box>
  );
}

export default App;
