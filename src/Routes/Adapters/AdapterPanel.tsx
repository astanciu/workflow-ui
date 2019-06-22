import { Button } from 'antd';
import { Title } from 'Components/EditableTitle';
import { FlexRow } from 'Components/Layout';
import { HTMLNodeIcon } from 'Components/NodeIcon';
import { PanelSection } from 'Components/PanelSection';
import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAdapter, updateAdapter } from 'ReduxState/actions';
import styled from 'styled-components';
import { DetailsForm } from './DetailsForm';

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
  const updateLoading = useSelector((state) => state.adapters.loadingUpdate);
  const error = useSelector((state) => state.adapters.deleteError);

  const editCode = () => dispatch(push(`/adapters/code/${adapter.uuid}`));

  const del = () => {
    dispatch(deleteAdapter(adapter.uuid));
  };

  if (error) {
    // TODO: handle workflow deps
    console.log('Delete Error', error);
  }

  const onSubmit = (values) => {
    console.log(`Submitted: `, values);
    dispatch(updateAdapter(adapter.uuid, values));
  };

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
        <DetailsForm
          loading={updateLoading}
          onSubmit={onSubmit}
          fields={{
            name: { value: adapter.name, options: { rules: [{ required: true, message: 'Name is required' }] } },
            description: { value: adapter.description },
            icon: { value: adapter.icon },
          }}
        />
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
