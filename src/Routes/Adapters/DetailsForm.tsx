import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Center } from 'Components';
import React, { FormEvent } from 'react';

type FormProps = {
  loading: boolean;
  onSubmit: (any) => void;
  fields: { [key: string]: { value: string; options?: any } };
};

const formOptions = {
  name: 'adapter_options',
  onFieldsChange: (props, changedFields) => {
    console.log(`onFieldsChanged`, changedFields);
  },
  mapPropsToFields(props) {
    const { fields } = props;

    const obj: any = {};
    Object.keys(fields).forEach((field) => {
      obj[field] = Form.createFormField({
        value: fields[field].value,
      });
    });

    return obj;
  },
};

const TheForm = ({ form, fields, onSubmit, loading }: FormProps & FormComponentProps) => {
  const { getFieldDecorator, validateFields } = form;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onSubmit(form.getFieldsValue());
      }
    });
  };

  return (
    <Form layout="vertical" onSubmit={submit}>
      <Form.Item label="Name">
        {getFieldDecorator('name', fields.name.options)(<Input placeholder="Adapter Name" />)}
      </Form.Item>
      <Form.Item label="Icon">{getFieldDecorator('icon', fields.icon.options)(<Input placeholder="Icon" />)}</Form.Item>
      <Form.Item label="Description">
        {getFieldDecorator('description', fields.description.options)(<Input.TextArea autosize />)}
      </Form.Item>
      <Center>
        <Button htmlType="submit" icon="save" type="primary" loading={loading}>
          Save
        </Button>
      </Center>
    </Form>
  );
};

export const DetailsForm = Form.create<FormProps & FormComponentProps>(formOptions)(TheForm);
