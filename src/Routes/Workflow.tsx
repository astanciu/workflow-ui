import React from 'react';

export const Workflow = props => {
  const { id } = props.match.params;
  return <div>Workflow detail {id}</div>;
};
