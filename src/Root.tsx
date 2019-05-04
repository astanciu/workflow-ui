import React from 'react';
import { useDispatch } from 'react-redux';
import { Provider, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { NotFound, Login, Logout, LoginCallback, ErrorComponent } from 'Routes';
import { AppRoot } from 'Routes/AuthenticatedAppRoot';
import { Spinner } from 'Components';
import { startBootup } from 'ReduxState/actions';

export const Root = ({ store, history }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/login/callback" component={LoginCallback} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/error" component={ErrorComponent} />
        <Route path="/" component={AppCore} />
        {/* <Route render={(props) => <NotFound {...props} source="Root" />} /> */}
      </Switch>
    </ConnectedRouter>
  </Provider>
);

const AppCore = (props) => {
  let state = useSelector((state) => ({
    user: state.app.user,
    ready: state.app.ready,
    isBooted: state.app.booted,
    router: state.router,
  }));

  console.log(state.router);

  const dispatch = useDispatch();

  if (!state.ready) {
    dispatch(startBootup(state.user));
    return <Spinner />;
  }

  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/" component={AppRoot} />
      <Route render={(props) => <NotFound {...props} source="Root" />} />
    </Switch>
  );
};
