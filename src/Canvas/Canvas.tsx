import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import Grid from './Grid/Grid.js';
import NodeComponent from './Node/Node';
import styles from './Canvas.module.css';
import EventManager from './Util/EventManager.js';
import { Node, Connection, Point } from '../classes';
import ConnectionPreview from './Connections/ConnectionPreview';
import ConnectionComponent from './Connections/ConnectionComponent';

type Props = {
  nodes: Node[];
  connections: Connection[];
  updateNode: (node: Node) => void;
  selectNode: (node: Node | null) => void;
  selectConnection: (conn: Connection | null) => void;
  removeConnection: (conn: Connection) => void;
  isAnyNodeSelected: boolean;
  createConnection: (fromNode: Node, toNode: Node) => void;
};

type ViewType = {
  width: number;
  height: number;
  x: number;
  y: number;
  scale: number;
};

type ConnectionInProgress = {
  from: Node;
  to: Point;
};

type State = {
  nodes: Node[];
  connections: Connection[];
  view: ViewType;
  connectionInProgress?: ConnectionInProgress;
  closestNode?: Node;
};

class Canvas extends React.Component<Props> {
  public MIN_SCALE = 0.25;
  public MAX_SCALE = 3;
  public velocity = { x: 0, y: 0 };
  public friction = 1;
  public domNode: Element | Text | null = null;
  private em!: EventManager;
  private animationFrame?: number;

  state: State = {
    nodes: [] as Node[],
    connections: [] as Connection[],
    view: {
      width: window.innerWidth,
      height: window.innerHeight,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      scale: 1
    },
    connectionInProgress: undefined
  };

  componentDidMount() {
    this.setCanvasSize();
    window.addEventListener('resize', this.setCanvasSize);
    this.domNode = ReactDOM.findDOMNode(this);

    this.em = new EventManager(this.domNode);
    this.em.onTap(this._onTap);
    this.em.onMove(this._onMove);
    this.em.onMoveEnd(this._onMoveEnd);
    this.em.onPinch(this._onPinch);
  }

  componentWillReceiveProps(next) {
    if (!isEqual(this.state.nodes, next.nodes)) {
      this.setState({ nodes: next.nodes });
    }

    if (!isEqual(this.state.connections, next.connections)) {
      this.setState({ connections: next.connections });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setCanvasSize);
  }

  setCanvasSize = debounce(() => {
    const view = { ...this.state.view };
    view.width = window.innerWidth;
    view.height = window.innerHeight;
    this.setState({ view });
  }, 50);

  setScale = (scale, location) => {
    const view = { ...this.state.view };

    if (scale < this.MIN_SCALE) {
      scale = this.MIN_SCALE;
    } else if (scale > this.MAX_SCALE) {
      scale = this.MAX_SCALE;
    }

    const xFactor = scale / view.scale - 1; //trial & error
    const posDelta = {
      x: location.x - view.x,
      y: location.y - view.y
    };

    view.scale = scale;
    view.x += -1 * posDelta.x * xFactor;
    view.y += -1 * posDelta.y * xFactor;

    this.setState({ view });
  };

  convertCoordsToSVG = (x, y): Point => {
    return new Point(
      (x - this.state.view.x) / this.state.view.scale,
      (y - this.state.view.y) / this.state.view.scale
    );
  };

  getTransform = () => {
    const view = this.state.view;
    return `matrix(${view.scale},0,0,${view.scale},${view.x},${view.y})`;
  };

  _onWheel = event => {
    let size = event.deltaY ? event.deltaY : 0 - event.wheelDeltaY;
    if (isNaN(size) || !size) return;

    const scale = this.state.view.scale + (-1 * size) / 200;
    let center = {
      x: event.clientX,
      y: event.clientY
    };

    this.setScale(scale, center);
  };

  _onTap = e => {
    this.props.selectNode(null);
    this.props.selectConnection(null);
  };

  _onPinch = e => {
    const center = { x: e.detail.x, y: e.detail.y };
    this.setScale(e.detail.scale, center);
  };

  _onMove = e => {
    const view = { ...this.state.view };
    view.x += e.detail.delta.x;
    view.y += e.detail.delta.y;
    this.setState({ view });
  };

  _onMoveEnd = e => {
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.velocity = e.detail.delta;

    this.friction = 0.85;
    this.animationFrame = requestAnimationFrame(this.glideCanvas.bind(this));
  };

  glideCanvas = () => {
    this.friction -= 0.01;
    if (this.friction < 0.01) this.friction = 0.01;
    this.velocity = {
      x: this.velocity.x * this.friction,
      y: this.velocity.y * this.friction
    };
    if (
      this.velocity.x < 0.02 &&
      this.velocity.x > -0.02 &&
      this.velocity.y < 0.02 &&
      this.velocity.y > -0.02
    ) {
      this.friction = 1.0;
      return;
    }

    const view = { ...this.state.view };
    view.x += this.velocity.x;
    view.y += this.velocity.y;

    this.setState({ view });
    this.animationFrame = requestAnimationFrame(this.glideCanvas.bind(this));
  };

  onConnectionDrag = (node: Node, e) => {
    const mousePosition = this.convertCoordsToSVG(e.detail.x, e.detail.y);
    this.setClosestNode(mousePosition);
    this.setState(currentState => ({
      connectionInProgress: {
        from: node,
        to: this.state.closestNode
          ? this.state.closestNode.inPortPosition
          : mousePosition
      }
    }));
  };

  setClosestNode = (mouse: Point): void => {
    const closest = this.getClosestInPortNode(mouse);
    if (closest) {
      this.setState({ closestNode: closest });
    } else {
      this.setState({ closestNode: undefined });
    }
  };

  getClosestInPortNode = (loc: Point): Node | undefined => {
    const { nodes } = this.props;

    const minDist: number = 30;
    let closestNode: Node | undefined;
    let closestDist: number;

    for (const node of nodes) {
      const distToMouse = node.inPortPosition.distanceTo(loc);

      if (distToMouse <= minDist) {
        if (!closestNode) {
          closestNode = node.clone();
          closestDist = distToMouse;
        } else {
          if (distToMouse < closestDist!) {
            closestNode = node.clone();
            closestDist = distToMouse;
          }
        }
      }
    }

    return closestNode;
  };

  onConnectionEnd = (node: Node, e) => {
    // console.log(`onConnectionEnd`, node.name);
    if (this.state.closestNode) {
      this.props.createConnection(node, this.state.closestNode);
    }
    this.setState({
      connectionInProgress: null,
      closestNode: undefined
    });
  };

  render() {
    const nodes = this.state.nodes.map(node => (
      <NodeComponent
        key={node.id}
        node={node}
        updateNode={this.props.updateNode}
        selectNode={this.props.selectNode}
        unselected={this.props.isAnyNodeSelected}
        canvasView={this.state.view}
        onConnectionDrag={this.onConnectionDrag}
        onConnectionEnd={this.onConnectionEnd}
        connectionCandidate={
          this.state.closestNode ? this.state.closestNode.id === node.id : false
        }
      />
    ));

    const connections = this.state.connections.map(conn => (
      <ConnectionComponent
        key={conn.id}
        connection={conn}
        select={this.props.selectConnection}
        unselected={this.props.isAnyNodeSelected}
        removeConnection={this.props.removeConnection}
      />
    ));

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={this.state.view.width}
        height={this.state.view.height}
        onWheel={this._onWheel}
        className={styles.Canvas}
        id="svgCanvas"
      >
        <g id="Canvas" transform={this.getTransform()}>
          <Grid view={this.state.view} />
          {connections}
          {this.state.connectionInProgress && (
            <ConnectionPreview
              startNode={this.state.connectionInProgress.from}
              mouse={this.state.connectionInProgress.to}
            />
          )}
          {nodes}
        </g>
      </svg>
    );
  }
}

export default Canvas;
