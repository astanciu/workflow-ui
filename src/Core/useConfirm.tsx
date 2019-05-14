import { Modal } from 'antd';
import { useEffect, useState } from 'react';

type Options = {
  title?: string;
  message?: string;
  yesLabel?: string;
  noLabel?: string;
};

export const useConfirm = () => {
  const [show, setShow] = useState();
  useEffect(() => {
    let fn = ({
      title = 'Are you sure?',
      message = '',
      yesLabel = 'Yes',
      noLabel = 'No',
    }: Options): Promise<boolean> => {
      return new Promise((res) => {
        Modal.confirm({
          title,
          content: message,
          okText: yesLabel,
          cancelText: noLabel,
          onOk() {
            res(true);
          },
          onCancel() {
            res(false);
          },
        });
      });
    };

    setShow(() => fn);
  }, []);

  return show;
};
