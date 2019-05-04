import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'Components/index';
import Canvas from 'Components/Canvas/Canas';
import { loadWorkflow } from 'ReduxState/actions';
import { TopBar } from './TopBar/index';
import styled from 'styled-components';
import { Test } from 'Test/Test';
// import { AddModal } from './AddModal';
type Props = {
  loadWorkflow: () => void;
  loading: boolean;
  error: Error;
};

const Container = styled.div`
  // border: 1px solid blue;
  width: 100%;
  height: 100%;
  overflow: none;
`;

@connect(
  (state) => ({
    loading: state.app.loading,
    error: state.app.error,
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
        {/* <TopBar /> */}
        {/* <Sidebar /> */}
        {/* <Panel /> */}
        <Container>
          <Canvas />
        </Container>
        {/* <AddModal /> */}
        {/* <Test /> */}
      </>
    );
  }
}
