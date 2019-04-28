import React from 'react';
import { Link } from 'react-router-dom';

export const Workflows = props => {
  return (
    <div>
      Workflows route
      <Link to="workflows/1" _target="blank">
        Workflow 1
      </Link>
      <Link to="workflows/2" _target="blank">
        Workflow 2
      </Link>
    </div>
  );
};
