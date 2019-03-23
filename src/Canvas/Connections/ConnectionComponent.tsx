import React, { useRef, useEffect } from 'react';
import EventManager from '../Util/EventManager.js';
import { Connection } from '../../models';
import { isEqual } from 'lodash';
import styles from './Connections.module.css';
import { makeSVGPath, findPointOnCurve } from './util';

type Props = {
  connection: Connection;
  unselected: boolean;
  select: (conn: Connection) => void;
  removeConnection: (conn: Connection) => void;
};

const ConnectionComponent = ({
  connection,
  select,
  unselected,
  removeConnection
}: Props) => {
  const connectionDom = useRef(null);
  const closeDom = useRef(null);
  const connectionRef = useRef(connection);

  // This effect runs only first time
  useEffect(() => {
    const connectionEM = new EventManager(connectionDom.current);
    connectionEM.onTap(e => {
      e.stopPropagation();
      select(connectionRef.current);
    });

    const closeButtonEM = new EventManager(closeDom.current);
    closeButtonEM.onTap(e => {
      e.stopPropagation();
      removeConnection(connectionRef.current);
    });

    return () => {
      connectionEM.setdown();
      closeButtonEM.setdown();
    };
  }, []);

  // must rebind connectionRef.current because it's used in the above effect
  // which does not update
  useEffect(() => {
    connectionRef.current = connection;
  });

  const start = connection.from.outPortPosition;
  const end = connection.to.inPortPosition;

  const { path, c1, c2 } = makeSVGPath(start, end);

  const center = findPointOnCurve(0.5, start, c1, c2, end);

  let className = styles.Connection;
  if (connection.selected) {
    className = styles.ConnectionSelected;
  }
  if (unselected) {
    className = styles.ConnectionUnselected;
  }

  return (
    <g ref={connectionDom}>
      <path d={path} className={styles.ConnectionHitBox} />
      <path d={path} className={className} />
      <g ref={closeDom} display={connection.selected ? '' : 'none'}>
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
    </g>
  );
};

export default React.memo(ConnectionComponent, (prev, next) => {
  const c = prev.connection;
  const n = next.connection as Connection;

  return isEqual(c, n) && isEqual(next.unselected, prev.unselected);
});
