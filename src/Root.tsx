import React from 'react';

import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { NotFound, Login, Logout, LoginCallback, ErrorComponent } from 'Routes';
import { AppRoot } from 'Routes/AuthenticatedAppRoot';
import { Spinner } from 'Components';
import { useBootstrap } from 'Core/useBootstrap';

export const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login/callback" component={LoginCallback} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/error" component={ErrorComponent} />
        <Route component={AppCore} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

const AppCore = (props) => {
  const ready = useBootstrap();

  if (!ready) return <Spinner />;

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/" component={AppRoot} />
      <Route render={(props) => <NotFound {...props} source="Root" />} />
    </Switch>
  );
};
