import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { NotFound, Login, Logout, LoginCallback, ErrorComponent } from 'Routes';

import { AppRoot } from 'Routes/AuthenticatedAppRoot';
import { Spinner } from 'Components';

export const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppCore />
    </ConnectedRouter>
  </Provider>
);

const AppCore = (props) => {
  let loading = useSelector((state) => state.app.globalLoading);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/login/callback" component={LoginCallback} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/error" component={ErrorComponent} />

      <Route path="/" component={AppRoot} />
      <Route render={(props) => <NotFound {...props} source="Root" />} />
    </Switch>
  );
};
