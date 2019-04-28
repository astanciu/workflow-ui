import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'Components/index';
import Canvas from 'Canvas/Canas';
import { loadWorkflow } from 'redux-assets/actions';
import { TopBar } from 'TopBar/index';

import { Test } from 'Test/Test';
// import { AddModal } from 'AddModal/AddModal';
type Props = {
  loadWorkflow: () => void;
  loading: boolean;
  error: Error;
};

@connect(
  state => ({
    loading: state.loading,
    error: state.error
  }),
  { loadWorkflow }
)
export class Workflow extends Component<Props> {
  componentWillMount() {
    this.props.loadWorkflow();
  }

  render() {
    if (this.props.loading) {
      return <Spinner />;
    }

    if (this.props.error) {
      return <div>{this.props.error.message}</div>;
    }

    return (
      <>
        <TopBar />
        {/* <Sidebar /> */}
        {/* <Panel /> */}
        <Canvas />
        {/* <AddModal /> */}
        <Test />
      </>
    );
  }
}
