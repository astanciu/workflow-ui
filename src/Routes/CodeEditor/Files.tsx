import { Button } from 'antd';
import { FlexCol } from 'Components/Layout';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  // border: 1px solid red;
  width: 150px;
`;
export const Files = ({ fs, onFileSelect }) => {
  const list = Object.keys(fs || {}).map((file) => {
    return (
      <Button key={file} type="link" onClick={() => onFileSelect(file, fs[file])}>
        {file}
      </Button>
    );
  });
  return (
    <Container>
      <FlexCol style={{ alignItems: 'flex-start' }}>
        <h3>Files</h3>
        {list}
      </FlexCol>
    </Container>
  );
};
