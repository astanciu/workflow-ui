import React from 'react';
import EventManager from '../Util/EventManager.js';
import { Connection } from '../../classes';
import { isEqual } from 'lodash';
import styles from './Connections.module.css';
import { makeSVGPath, findPointOnCurve } from './util';

type Props = {
  connection: Connection;
  select: (conn: Connection) => void;
  removeConnection: (conn: Connection) => void;
};

class ConnectionComponent extends React.Component<Props> {
  private connectionDomEl;
  private closeDomEl;
  private emConn: EventManager | undefined;
  private emClose: EventManager | undefined;

  constructor(props) {
    super(props);
    this.connectionDomEl = React.createRef();
    this.closeDomEl = React.createRef();
  }

  componentDidMount() {
    this.emConn = new EventManager(this.connectionDomEl.current);
    this.emConn.onTap(this._onTapConnection);

    this.emClose = new EventManager(this.closeDomEl.current);
    this.emClose.onTap(this._onTapClose);
  }

  shouldComponentUpdate(nextProps) {
    const c = this.props.connection;
    const n = nextProps.connection as Connection;

    return !isEqual(c, n);
  }

  _onTapConnection = e => {
    e.stopPropagation();
    this.props.select(this.props.connection);
  };

  _onTapClose = e => {
    this.props.removeConnection(this.props.connection);
  };

  render() {
    const { connection } = this.props;
    const { x: startX, y: startY } = connection.from.outPortPosition;
    const { x: endX, y: endY } = connection.to.inPortPosition;

    const { path, c1X, c1Y, c2X, c2Y } = makeSVGPath(
      startX,
      startY,
      endX,
      endY
    );

    const center = findPointOnCurve(
      0.5,
      startX,
      startY,
      c1X,
      c1Y,
      c2X,
      c2Y,
      endX,
      endY
    );

    return (
      <g ref={this.connectionDomEl}>
        <path d={path} className={styles.ConnectionHitBox} />
        <path
          d={path}
          className={
            connection.selected ? styles.ConnectionSelected : styles.Connection
          }
        />
        <g ref={this.closeDomEl} display={connection.selected ? '' : 'none'}>
          <circle
            className={styles.CloseOutline}
            cx={center.x}
            cy={center.y}
            r={12}
          />
          <circle className={styles.Close} cx={center.x} cy={center.y} r={10} />

          <svg
            viewBox="0 0 352 512"
            className={styles.CloseX}
            width="14px"
            height="14px"
            x={center.x - 7}
            y={center.y - 7}
          >
            <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
          </svg>
        </g>
        )
      </g>
    );
  }
}

// const ConnectionComponentx = ({
//   connection,
//   select,
//   removeConnection
// }: Props) => {
//   const connectionDom = useRef(null);
//   let em;

//   // useEffect(() => {
//   //   console.log(`Use Effect ${connection.from.position.x}`);
//   //   em = new EventManager(connectionDom.current);
//   //   em.onTap(e => {
//   //     e.stopPropagation();
//   //     select(connection);
//   //   });

//   //   return () => {
//   //     console.log(`Cleanup`);
//   //     em.setdown();
//   //   };
//   // }, [connection.from.position, connection.to.position]);

//   // console.log(`rendering: `, connection);
// };

export default ConnectionComponent;
