import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard, Adapters, Workflows, NotFound } from 'Routes';
import { Workflow } from 'Workflow';
import { Layout } from 'Components/Layout';

export const AppRoot = ({ match }) => {
  return (
    <Layout>
      <Switch>
        <Route exact path={`${match.path}`} component={Dashboard} />
        <Route exact path={`${match.path}adapters`} component={Adapters} />
        <Route exact path={`${match.path}workflows`} component={Workflows} />
        <Route exact path={`${match.path}workflows/:id`} component={Workflow} />

        <Route render={(props) => <NotFound {...props} source="App" />} />
      </Switch>
    </Layout>
  );
};
