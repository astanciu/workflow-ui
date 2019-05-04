import React from 'react';
import { Link } from 'react-router-dom';
import { Page } from 'Components/Page';

export const Workflows = (props) => {
  return (
    <Page title="Workflows">
      <div>
        Workflows route
        <Link to="workflows/1" _target="blank">
          Workflow 1
        </Link>
        <Link to="workflows/2" _target="blank">
          Workflow 2
        </Link>
      </div>
    </Page>
  );
};
