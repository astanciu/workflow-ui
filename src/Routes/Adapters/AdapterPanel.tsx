import { Button, Form, Input } from 'antd';
import { Title } from 'Components/EditableTitle';
import { FlexRow } from 'Components/Layout';
import { HTMLNodeIcon } from 'Components/NodeIcon';
import { PanelSection } from 'Components/PanelSection';
import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAdapter } from 'ReduxState/actions';
import styled from 'styled-components';

const Container = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const AdapterPanel = ({ adapter }) => {
  const dispatch = useDispatch();
  const deleteLoading = useSelector((state) => state.adapters.loadingDelete);
  const error = useSelector((state) => state.adapters.deleteError);

  const editCode = () => dispatch(push(`/adapters/code/${adapter.uuid}`));
  const del = () => {
    dispatch(deleteAdapter(adapter.uuid));
  };
  if (error) {
    // TODO: handle workflow deps
    console.log('Delete Error', error);
  }
  return (
    <Container>
      <FlexRow style={{ padding: '20px 0px 20px 20px' }}>
        <HTMLNodeIcon icon={adapter.icon} size={20} />
        <Title>{adapter.name}</Title>
      </FlexRow>

      <PanelSection title="Edit Code" icon="code" center={true}>
        <div>
          <Button onClick={editCode} icon="code" type="primary">
            Open Editor
          </Button>
        </div>
      </PanelSection>

      <PanelSection title="Properties" icon="edit" center={false} color="#ff038f">
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input value={adapter.name} />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea autosize value={adapter.description} />
          </Form.Item>
          <Button onClick={del} icon="save" type="primary">
            Save
          </Button>
        </Form>
      </PanelSection>

      <PanelSection title="Delete Adapter" icon="code" center={true} color="#ff0000">
        <div>
          <Button onClick={del} icon="delete" type="danger" loading={deleteLoading}>
            Delete
          </Button>
        </div>
      </PanelSection>
    </Container>
  );
};
