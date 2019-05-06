import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { Spinner } from 'Components';

export const Portal = ({ children }) => {
  const [portal, setPortal] = useState();

  useEffect(() => {
    const p = document.getElementById('side-panel');
    let childNodes = p!.childNodes;
    const clones: HTMLElement[] = [];
    // @ts-ignore
    childNodes.forEach((c) => clones.push(c.cloneNode(true)));
    while (p!.firstChild) {
      p!.removeChild(p!.firstChild);
    }

    setPortal(p!);

    return function cleanup() {
      clones.forEach((c) => p!.appendChild(c));
    };
  }, []);

  if (!portal) {
    return <Spinner />;
  }

  let content = <>Default Sidebar</>;
  if (children) content = <>{children}</>;

  return ReactDOM.createPortal(content, portal);
};
