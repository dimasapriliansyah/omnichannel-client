import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LogIn from './Pages/Login';
import Home from "./Container/Home/index";

const homepage = (props) => (
  <Home routeProps={props} />
);

const Router = () => (
  <main>
    <Switch>
      <Route exact path="/" component={LogIn} />
      <Route exact path="/login" component={LogIn} />
      <Route path="/" render={homepage} />
    </Switch>
  </main>
);

export default Router;
