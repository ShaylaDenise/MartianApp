import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../Home';
import Register from '../Register';
import Encounters from '../Encounters';
import Reports from '../Reports';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route path="/encounters" exact component={Encounters} />
      <Route path="/reports" exact component={Reports} />
    </Switch>
  </BrowserRouter>
);
