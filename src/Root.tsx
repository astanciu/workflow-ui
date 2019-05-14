import { Spinner } from 'Components';
import { ConnectedRouter } from 'connected-react-router';
import { Auth } from 'Core/Auth';
import { useBootstrap } from 'Core/useBootstrap';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ErrorComponent, GQLExplorer, Login, LoginCallback, Logout, NotFound } from 'Routes';
import { AppRoot } from 'Routes/AuthenticatedAppRoot';

export const Root = ({ store, history }) => {
  Auth.setHistory(history);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/login/callback" component={LoginCallback} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/error" component={ErrorComponent} />
          <Route exact path="/graphql" component={GQLExplorer} />
          <Route component={AppCore} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

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
