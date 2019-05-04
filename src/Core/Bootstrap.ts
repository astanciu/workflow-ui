import { loginStart, bootupEnd } from 'ReduxState/actions';
import { useDispatch } from 'react-redux';

let loginStarted = false;
export const Bootstrap = async (user) => {
  const dispatch = useDispatch();

  if (!user) {
    if (loginStarted) return;
    loginStarted = true;
    dispatch(loginStart());
  } else {
    dispatch(bootupEnd());
  }
};
