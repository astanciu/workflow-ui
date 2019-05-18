import { Button } from 'antd';
import { Page } from 'Components/Page';
import { Data } from 'Core/Data';
import React from 'react';

export const Dashboard = (props) => {
  const click = async () => {
    try {
      let r = await Data.query('{hello}');
      console.log(`in click results: `, r);
    } catch (err) {
      console.log(`Caught the error: `, err.message);
    }
  };

  return (
    <Page title="Dashboard">
      Hello
      <br />
      <div>
        <Button type="primary" onClick={click}>
          Call API
        </Button>
      </div>
    </Page>
  );
};
