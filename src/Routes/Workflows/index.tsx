import { Button, Typography } from 'antd';
import { Page } from 'Components/Page';
import { Portal } from 'Components/Portal';
import { GenericPanel } from 'Components/RootLayout/GenericPanel';
import { useSelectedItem } from 'Core/useSelectedItem';
import React, { useRef } from 'react';
import { workflow1, workflow2, workflow3 } from 'samples/workflows';
import { WorkflowItem } from './WorkflowItem';
const workflows = [workflow1, workflow2, workflow3];

export const Workflows = (props) => {
  const domEl = useRef<HTMLDivElement>(null);
  const [selectedWorkflow, select] = useSelectedItem(domEl);
  const list = workflows.map((w) => (
    <WorkflowItem key={w.id} workflow={w} select={select} selected={w.id === selectedWorkflow} />
  ));

  return (
    <Page empty={true} r={domEl}>
      <Page.Header>
        <Page.Title>Workflows</Page.Title>
        <Button type="primary" icon="plus" size="default">
          Workflow
        </Button>
      </Page.Header>
      {list}
      {!selectedWorkflow && (
        <Portal>
          <GenericPanel title="Workflows">
            <Typography.Paragraph>Workflows let you wire up adapters</Typography.Paragraph>
          </GenericPanel>
        </Portal>
      )}
    </Page>
  );
};
