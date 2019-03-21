import React, { useRef, useEffect } from 'react';
import EventManager from '../Util/EventManager.js';
import { Connection } from '../../classes';
import sprites from '../Icon/sprites-solid.svg';
import styles from './Connections.module.css';
import { makeSVGPath, findPointOnCurve } from './util';

type Props = {
  connection: Connection;
  select: (conn: Connection) => void;
  removeConnection: (conn: Connection) => void;
};

const ConnectionComponent = ({
  connection,
  select,
  removeConnection
}: Props) => {
  const connectionDom = useRef(null);
  let em;

  useEffect(() => {
    console.log(`Use Effect ${connection.from.position.x}`);
    em = new EventManager(connectionDom.current);
    em.onTap(e => {
      e.stopPropagation();
      select(connection);
    });

    return () => {
      console.log(`Cleanup`);
      em.setdown();
    };
  }, [connection.from.position, connection.to.position]);

  const { x: startX, y: startY } = connection.from.outPortPosition;
  const { x: endX, y: endY } = connection.to.inPortPosition;

  const { path, c1X, c1Y, c2X, c2Y } = makeSVGPath(startX, startY, endX, endY);
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

  const rmConn = () => removeConnection(connection);
  // console.log(`rendering: `, connection);
  return (
    <g ref={connectionDom}>
      {/* <g onClick={() => select(connection)}> */}
      <path d={path} className={styles.ConnectionHitBox} />
      <path
        d={path}
        className={
          connection.selected ? styles.ConnectionSelected : styles.Connection
        }
      />
      {connection.selected && (
        <g onClick={rmConn}>
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
      )}
    </g>
  );
};

export default ConnectionComponent;
