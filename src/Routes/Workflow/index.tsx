import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'Components/index';
import Canvas from 'Components/Canvas/Canvas';
import { loadWorkflow, showPanel } from 'ReduxState/actions';
import { AddModal } from './AddModal';

import styled from 'styled-components';

type Props = {
  loadWorkflow: () => void;
  showPanel: (visible: boolean) => void;
  loading: boolean;
  error: Error;
  showAdd: boolean;
};

const Container = styled.div`
  // border: 1px solid blue;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

@connect(
  (state) => ({
    loading: state.app.loading,
    error: state.app.error,
  }),
  { loadWorkflow, showPanel }
)
export class Workflow extends Component<Props> {
  public state = {
    showAdd: false,
  };
  componentWillMount() {
    this.props.showPanel(false);
    this.props.loadWorkflow();
  }

  componentWillUnmount() {
    this.props.showPanel(true);
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
        <Container>
          <Canvas />
        </Container>
        {this.state.showAdd && <AddModal />}
      </>
    );
  }
}
