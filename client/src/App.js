import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const FourOhFour = () => <h1>Oh no 404</h1>;

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/faves" component={Faves} />
        <Route component={FourOhFour} />
      </Switch>
    </div>
  </BrowserRouter>
);
export default App;
