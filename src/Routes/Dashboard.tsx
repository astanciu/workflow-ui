import { Button } from 'antd';
import { Page } from 'Components/Page';
import { Data } from 'Core/Data';
import React from 'react';

export const Dashboard = (props) => {
  const q = '{hello}';
  // const [loading, data, error] = useGetData(q)

  const click = async () => {
    try {
      let r = await Data.query(q, null);
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
