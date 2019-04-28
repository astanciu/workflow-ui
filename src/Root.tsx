import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NotFound, Login, Error } from './Routes';
import { Workflow } from './Workflow/Workflow';
import App from './App/App';

export const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/error" component={Error} />
        <Route exact path={`/workflows/:id`} component={Workflow} />
        <Route path="/" component={App} />
        <Route render={props => <NotFound {...props} source="Root" />} />
      </Switch>
    </Router>
  </Provider>
);
