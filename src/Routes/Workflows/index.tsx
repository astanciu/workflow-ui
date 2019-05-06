import React, { useRef } from 'react';
import { Page } from 'Components/Page';
import { Button } from 'antd';
import { WorkflowItem } from './WorkflowItem';
import { Portal } from 'Components/Portal';
import { useSelectedItem } from 'Core/useSelectedItem';
import { workflow1, workflow2, workflow3 } from 'samples/workflows';
const workflows = [workflow1, workflow2, workflow3];

export const Workflows = (props) => {
  const domEl = useRef<HTMLDivElement>(null);
  const [selectedWorkflow, select] = useSelectedItem(domEl);
  const list = workflows.map((w) => (
    <WorkflowItem key={w.id} workflow={w} select={select} selected={w.id === selectedWorkflow} />
  ));

  return (
    <Page empty={true}>
      <Page.Header>
        <Page.Title>Workflows</Page.Title>
        <Button type="primary" icon="plus" size="default">
          Workflow
        </Button>
      </Page.Header>
      <div ref={domEl}>{list}</div>
      {!selectedWorkflow && (
        <Portal>
          <h1>Workflows</h1>
          <p>They rock</p>
        </Portal>
      )}
    </Page>
  );
};
