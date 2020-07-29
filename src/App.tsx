import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
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
