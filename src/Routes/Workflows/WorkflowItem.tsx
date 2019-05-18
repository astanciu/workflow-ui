import { Avatar, Button, Icon } from 'antd';
import { Portal } from 'Components/Portal';
import { push } from 'connected-react-router';
import { getTimeTouched } from 'Core/Utils';
import React, { SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  border: 3px solid ${({ selected }) => (selected ? '#1990ff' : 'transparent')};
  margin: 5px 0px;
  border-radius: 5px;
  background: white;
  padding: 5px;
  box-shadow: 0px 2px 2px -1px #55555575;

  &:hover {
    // border: 3px solid #1990ff;
    background: #f7f7f7;
    cursor: pointer;
  }

  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  // border: 1px solid red;
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid #f1f1f1;
  &:last-child {
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
  // font-size: 1em;
  font-weight: 300;
`;

const Right = styled.div`
  margin-left: auto;
`;

const TimeStampContainer = styled.div`
  font-size: 0.7em;
  opacity: 0.8;
`;

export const WorkflowItem = ({ workflow, selected, select }) => {
  const dispatch = useDispatch();
  const clicked = (e: SyntheticEvent) => {
    e.nativeEvent.stopImmediatePropagation();
    select(workflow.id);
  };

  const openWorkflow = () => {
    dispatch(push(`/workflows/${workflow.id}`));
  };

  const timeTouched = getTimeTouched(workflow);

  return (
    <>
      <Container onClick={clicked} selected={selected}>
        <Line>
          <Icon rotate={90} type="fork" style={{ fontSize: '1.5em', color: selected ? '#1990ff' : '#79a7d2' }} />
          <Name>
            <Title>{workflow.name}</Title>
            <Description>{workflow.description}</Description>
          </Name>
          <Right>
            <Button size="small" onClick={openWorkflow}>
              Open
            </Button>
          </Right>
        </Line>
        <Line>
          <Right>
            <TimeStampContainer>
              {timeTouched.verb} <strong>{timeTouched.ago} </strong> by{' '}
              <Avatar
                size={15}
                src="https://lh5.googleusercontent.com/-0BKAxriuUeg/AAAAAAAAAAI/AAAAAAAAA2I/udWiK-4474w/photo.jpg"
              />
            </TimeStampContainer>
          </Right>
        </Line>
      </Container>
      {selected && (
        <Portal>
          <WorkflowDetails workflow={workflow} />
        </Portal>
      )}
    </>
  );
};

const WorkflowDetails = ({ workflow }) => {
  return <div>Details for: {workflow.name}</div>;
};
