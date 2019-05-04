import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from 'ReduxState/actions';
import { Auth } from 'Core/Auth';

export const useBootstrap = () => {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  let user = useSelector((state) => state.app.user);

  useEffect(() => {
    async function run() {
      if (user) {
        setReady(true);
      } else {
        let u = await Auth.login();
        dispatch(loginSuccess(u));
        setReady(true);
      }
    }

    run();
  }, [dispatch, user]);

  return ready;
};
