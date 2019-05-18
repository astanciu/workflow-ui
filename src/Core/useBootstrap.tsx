import { push } from 'connected-react-router';
import { Auth } from 'Core/Auth';
import pick from 'lodash-es/pick';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from 'ReduxState/actions';
import { Data } from './Data';

let q = `
query _($user:UserInput){
  hello(user:$user){
    firstTime
  }
}
`;
export const useBootstrap = () => {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  let user = useSelector((state) => state.app.user);

  useEffect(() => {
    async function run() {
      if (!user) {
        let u = await Auth.login();
        dispatch(loginSuccess(u));
        return;
      }

      const { data, errors } = await Data.query(q, { user: pick(user, ['user_id', 'name', 'email', 'picture']) });

      if (errors && errors.length) {
        dispatch(push('/error', { errors }));
      } else {
        // TODO: dispatch here
        setFirstTime(data.hello.firstTime);
        setReady(true);
      }
    }

    run();
  }, [dispatch, user]);

  return [firstTime, ready];
};
