import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { NotFound, Login, LoginCallback, Error } from 'Routes';
import { Workflow } from 'Workflow/Workflow';
import App from 'Routes/AppRoot/App';

export const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/login/callback" component={LoginCallback} />
        <Route exact path="/error" component={Error} />
        <Route exact path={`/workflows/:id`} component={Workflow} />
        <Route path="/" component={App} />
        <Route render={(props) => <NotFound {...props} source="Root" />} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);
