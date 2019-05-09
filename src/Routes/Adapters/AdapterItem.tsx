import React from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';
import { Portal } from 'Components/Portal';
import { HTMLNodeIcon } from 'Components/NodeIcon';
import { AdapterPanel } from './AdapterPanel';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  border: 3px solid ${({ selected }) => (selected ? '#1990ff' : 'transparent')};
  margin-bottom: 5px;

  border-radius: 5px;
  background: white;
  padding: 5px;
  box-shadow: 0px 2px 2px -1px #55555575;

  &:hover {
    // border: 3px solid #1990ff;
    background: #f7f7f7;
    cursor: pointer;
  }
`;

const Line = styled.div`
  // border: 1px solid red;
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  // border-bottom: 1px solid #f1f1f1;
  &:last-child {
    margin-top: auto;
    border-bottom: none;
    padding-bottom: 0px;
    margin-bottom: 0px;
  }
`;

const Name = styled.div`
  margin: 0px 8px;
`;
const Title = styled.div`
  font-size: 1em;
  line-height: 1em;
  font-weight: 700;
`;
const Description = styled.div`
  font-size: 0.8em;
  font-weight: 300;
`;
const Version = styled.div`
  font-size: 0.7em;
  font-weight: 300;
`;

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 2px;
`;
const Right = styled.div`
  margin-left: auto;
`;

// const TimeStampContainer = styled.div`
//   font-size: 0.7em;
//   opacity: 0.8;
// `;

export const AdapterItem = ({ adapter, selected, select }) => {
  return (
    <>
      <Container onClick={() => select(adapter.id)} selected={selected}>
        <Line>
          <IconWrapper>
            <HTMLNodeIcon icon={adapter.icon} size={30} />
          </IconWrapper>
          <Name>
            <Title>{adapter.name}</Title>
            {/* <Description>{adapter.description}</Description> */}
          </Name>
        </Line>
        <Line>
          <Description>{adapter.description}</Description>
        </Line>
        <Line>
          <Right>
            <Version>
              <Tag color="green">v{adapter.version}</Tag>
            </Version>
          </Right>
        </Line>
      </Container>
      {selected && (
        <Portal>
          <AdapterPanel adapter={adapter} />
        </Portal>
      )}
    </>
  );
};
