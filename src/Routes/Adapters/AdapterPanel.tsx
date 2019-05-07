import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { FlexRow } from 'Components/Layout';
import { HTMLNodeIcon } from 'Components/NodeIcon';
import { EditableTitle } from 'Components/EditableTitle';

const Container = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const AdapterPanel = ({ adapter }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(adapter.name);
  const editCode = () => dispatch(push(`/adapters/code/${adapter.id}`));
  return (
    <Container>
      <FlexRow style={{ padding: '20px 0px 0px 20px' }}>
        <HTMLNodeIcon icon={adapter.icon} size={20} />
        <EditableTitle title={title} onChange={(v) => setTitle(v)} />
      </FlexRow>
      <Button onClick={editCode} icon="code">
        Edit Code
      </Button>
    </Container>
  );
};
