import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dashboard, Adapters, Workflows, NotFound, Things } from 'Routes';
import { Workflow } from 'Routes/Workflow';
import { Layout } from 'Components/Layout/Core';

export const AppRoot = ({ match }) => {
  return (
    <Layout>
      <Switch>
        <Route exact path={`${match.path}`} component={Dashboard} />
        <Route exact path={`${match.path}adapters`} component={Adapters} />
        <Route exact path={`${match.path}workflows`} component={Workflows} />
        <Route exact path={`${match.path}workflows/:id`} component={Workflow} />

        <Route exact path={`${match.path}things`} component={Things} />
        <Route render={(props) => <NotFound {...props} source="App" />} />
      </Switch>
    </Layout>
  );
};
