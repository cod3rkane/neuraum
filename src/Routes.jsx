import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/Home';

const NoMatch = () => {
  return <Fragment>404 Page not Found.</Fragment>;
};

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NoMatch} />
    </Switch>
  );
};
