import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import findIndex from 'lodash/findIndex';

import Canvas from '../Canvas/Canvas';
import { Node, Connection } from '../classes';

type WorkflowType = {
  workflow: any;
};

type WorkflowState = {
  nodes: Node[];
  connections: Connection[];
};

export class Workflow extends Component<WorkflowType> {
  state: WorkflowState = {
    nodes: [],
    connections: []
  };

  componentDidMount() {
    const nodes = this.props.workflow.nodes.map(
      node => new Node(node)
    ) as Node[];

    const connections = this.props.workflow.connections.map(conn => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);

      if (fromNode && toNode) {
        return new Connection(fromNode, toNode, conn.id);
      }
      return null;
    }) as Connection[];

    this.setState({
      nodes,
      connections
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
    this.setState((previousState: WorkflowState) => {
      let posChanged = false;
      const nodes = previousState.nodes.map(n => {
        if (n.id === node.id) {
          posChanged = !isEqual(n.position, node.position);
          return node;
        } else {
          return n;
        }
      });

      if (posChanged) {
        const connections = previousState.connections.map(conn => {
          if (conn.from.id === node.id) {
            const newConn = conn.clone();
            newConn.from = node;
            return newConn;
          }

          if (conn.to.id === node.id) {
            const newConn = conn.clone();
            newConn.to = node;
            return newConn;
          }

          return conn;
        });

        return { nodes, connections };
      } else {
        return { nodes };
      }
    });
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

  selectConnection = (connection: Connection | null) => {
    if (connection === null || !connection) {
      const connection = this.state.connections.find(c => c.selected);
      if (!connection) return;
      this.onConnectionDeSelect(connection);
      return;
    }

    const currentlySelected = this.state.connections.find(c => c.selected);
    if (currentlySelected) {
      this.onConnectionDeSelect(currentlySelected);
      if (currentlySelected.id === connection.id) return;
    }

    this.onConnectionSelect(connection);
  };

  onConnectionSelect = (conn: Connection) => {
    const connection = conn.clone();
    connection.selected = true;
    this.updateConnection(connection);
  };

  onConnectionDeSelect = (conn: Connection) => {
    const connection = conn.clone();
    delete connection.selected;
    this.updateConnection(connection);
  };

  updateConnection = (connection: Connection) => {
    this.setState((previousState: WorkflowState) => {
      const connections = previousState.connections.map(c =>
        c.id === connection.id ? connection : c
      );
      return { connections };
    });
  };

  isAnyNodeSelected = (): boolean => {
    return !!this.state.nodes.find(n => n.selected);
  };

  createConnection = (from: Node, to: Node) => {
    const exists = this.state.connections.find(
      c => c.from.id === from.id && c.to.id === to.id
    );
    if (exists) return;

    const conn = [...this.state.connections];
    conn.push(new Connection(from, to));

    this.setState({ connections: conn });
  };

  removeConnection = (connection: Connection) => {
    console.log(`delete`);
    this.setState((previousState: WorkflowState) => {
      const connections = previousState.connections.filter(
        c => c.id !== connection.id
      );
      return { connections };
    });
  };

  render() {
    return (
      <Canvas
        nodes={this.state.nodes}
        connections={this.state.connections}
        updateNode={this.updateNode}
        selectNode={this.selectNode}
        selectConnection={this.selectConnection}
        removeConnection={this.removeConnection}
        isAnyNodeSelected={this.isAnyNodeSelected()}
        createConnection={this.createConnection}
      />
    );
  }
}
