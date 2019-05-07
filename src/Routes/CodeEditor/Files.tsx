import React from 'react';
import styled from 'styled-components';

import { FlexCol } from 'Components/Layout';
const Container = styled.div`
  border: 1px solid red;
  width: 150px;
`;
export const Files = (props) => {
  return (
    <Container>
      <FlexCol style={{ alignItems: 'flex-start' }}>
        <h3>Files</h3>
        <p>Add more files</p>
      </FlexCol>
    </Container>
  );
};
