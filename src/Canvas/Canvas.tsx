import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';

import isEqual from 'lodash/isEqual';
import Grid from './Grid/Grid.js';
import NodeComponent from './Node/Node';
import styles from './Canvas.module.css';
import EventManager from './Util/EventManager.js';
import { Node } from '../classes';

type Props = {
  nodes: Node[];
  updateNode: (node: Node) => void;
  selectNode: (node: Node | null) => void;
  isAnyNodeSelected: boolean;
};

class Canvas extends React.Component<Props> {
  public MIN_SCALE = 0.25;
  public MAX_SCALE = 3;
  public velocity = { x: 0, y: 0 };
  public friction = 1;
  public domNode: Element | Text | null = null;
  private em!: EventManager;
  private animationFrame?: number;

  state = {
    nodes: [] as Node[],
    view: {
      width: window.innerWidth,
      height: window.innerHeight,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      scale: 1
    },
    mouseMoveStart: null,
    connectionTarget: {}
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

  convertCoordsToSVG = (x, y) => {
    // console.log(`X: ${x}, Y: ${y}`);
    // console.log(`ViewX: ${this.state.view.x}, ViewY: ${this.state.view.y}`);
    return {
      x: (x - this.state.view.x) / this.state.view.scale,
      y: (y - this.state.view.y) / this.state.view.scale
    };
  };

  getTransform = () => {
    const view = this.state.view;
    return `matrix(${view.scale},0,0,${view.scale},${view.x},${view.y})`;
  };

  _onWheel = event => {
    let size = event.deltaY ? event.deltaY : 0 - event.wheelDeltaY;
    if (isNaN(size) || !size) return;

    const scale = this.state.view.scale + size / 200;
    let center = {
      x: event.clientX,
      y: event.clientY
    };

    this.setScale(scale, center);
  };

  _onTap = e => {
    this.props.selectNode(null);
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

    // if (this.domNode) {
    //   this.domNode.removeEventListener('click', this.onClick);
    //   setTimeout(
    //     () => this.domNode!.addEventListener('click', this.onClick),
    //     10
    //   );
    // }
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

  onConnectionDrag = (node, e) => {
    console.log(node);
    const target = this.convertCoordsToSVG(e.detail.x, e.detail.y);
    this.setState({ drawConnection: target });
  };

  onConnectionEnd = () => {
    this.setState({ drawConnection: undefined });
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
          {/* <ConnectionPreview drawConnection={this.state.drawConnection} /> */}
          {/* {this.state.drawConnection && ()} */}

          <Grid view={this.state.view} />
          {nodes}
        </g>
      </svg>
    );
  }
}

export default Canvas;
