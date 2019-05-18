import { Spinner } from 'Components';
import { Layout } from 'Components/RootLayout/Core';
import { useBootstrap } from 'Core/useBootstrap';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Adapters, CodeEditor, Dashboard, NotFound, Things, Workflows } from 'Routes';
import { Workflow } from 'Routes/Workflow';

export const AppRoot = ({ match }) => {
  const [firstTime, ready] = useBootstrap();

  if (!ready) return <Spinner />;

  return (
    <Layout>
      <Switch>
        <Route exact path={`/`} component={Dashboard} />
        <Route exact path={`/adapters`} component={Adapters} />
        <Route exact path={`/adapters/code/:id`} component={CodeEditor} />
        <Route exact path={`/workflows`} component={Workflows} />
        <Route exact path={`/workflows/:id`} component={Workflow} />

        <Route exact path={`/things`} component={Things} />
        <Route render={(props) => <NotFound {...props} source="App" />} />
      </Switch>
    </Layout>
  );
};
