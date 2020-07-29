import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FoundationStyle from './styles/foundation';

function App() {
  return (
    <div className="App">
        <FoundationStyle />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Top} />
            <Route path="/edit" component={EditContainer} />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
