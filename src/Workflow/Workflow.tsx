import React, { Component } from 'react';
import findIndex from 'lodash/findIndex';

import Canvas from '../Canvas/Canvas';
import { Node } from '../classes';

type WorkflowType = {
  workflow: any;
};

export class Workflow extends Component<WorkflowType> {
  state = {
    nodes: [] as Node[]
  };

  componentDidMount() {
    this.setState({
      nodes: this.props.workflow.nodes.map(node => new Node(node)) as Node[]
    });
  }

  onNodeSelect = (node: Node) => {
    node.selected = true;
    this.updateNode(node);
  };

  onNodeDeSelect = (node: Node) => {
    delete node.selected;
    this.updateNode(node);
  };

  updateNode = (node: Node) => {
    const nodes = [...this.state.nodes];
    const index = findIndex(nodes, { id: node.id });
    if (index !== -1) {
      nodes.splice(index, 1, node);
    } else {
      nodes.push(node);
    }

    this.setState({ nodes });
  };

  selectNode = (node: Node | null) => {
    if (node === null || !node) {
      const node = this.state.nodes.find(n => n.selected);
      if (!node) return;
      this.onNodeDeSelect(node);
      return;
    }

    const currentlySelected = this.state.nodes.find(n => n.selected);
    if (currentlySelected) {
      this.onNodeDeSelect(currentlySelected);
      if (currentlySelected.id === node.id) return;
    }

    this.onNodeSelect(node);
  };

  isAnyNodeSelected = (): boolean => {
    return !!this.state.nodes.find(n => n.selected);
  };

  render() {
    return (
      <Canvas
        nodes={this.state.nodes}
        updateNode={this.updateNode}
        selectNode={this.selectNode}
        isAnyNodeSelected={this.isAnyNodeSelected()}
      />
    );
  }
}
