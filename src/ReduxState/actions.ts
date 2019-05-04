import { push } from 'connected-react-router';
import workflow1 from 'samples/workflow1';

import { Auth } from 'Core';

function makeActionCreator(type, ...argNames) {
  return function(...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export const BOOTUP_BEGIN = 'BOOTUP_BEGIN';
export const BOOTUP_END = 'BOOTUP_END';
export const SELECT_NODE = 'SELECT_NODE';
export const UPDATE_NODE = 'UPDATE_NODE';
export const SELECT_CONNECTION = 'SELECT_CONNECTION';
export const CREATE_CONNECTION = 'CREATE_CONNECTION';
export const REMOVE_CONNECTION = 'REMOVE_CONNECTION';
export const UPDATE_CONNECTION = 'UPDATE_CONNECTION';
export const LOAD_WORKFLOW_BEGIN = 'LOAD_WORKFLOW_BEGIN';
export const LOAD_WORKFLOW_SUCCESS = 'LOAD_WORKFLOW_SUCCESS';
export const LOAD_WORKFLOW_ERROR = 'LOAD_WORKFLOW_ERROR';
export const LOGIN_CALLBACK = 'LOGIN_CALLBACK';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const bootupBegin = makeActionCreator(BOOTUP_BEGIN);
export const bootupEnd = makeActionCreator(BOOTUP_END);

export const selectNode = makeActionCreator(SELECT_NODE, 'node');
export const updateNode = makeActionCreator(UPDATE_NODE, 'node');

export const selectConnection = makeActionCreator(SELECT_CONNECTION, 'connection');
export const createConnection = makeActionCreator(CREATE_CONNECTION, 'fromNode', 'toNode');
export const removeConnection = makeActionCreator(REMOVE_CONNECTION, 'connection');
export const updateConnection = makeActionCreator(UPDATE_CONNECTION, 'connection');

export const loadWorkflowBegin = makeActionCreator(LOAD_WORKFLOW_BEGIN);
export const loadWorkflowSuccess = makeActionCreator(LOAD_WORKFLOW_SUCCESS, 'workflow');
export const loadWorkflowError = makeActionCreator(LOAD_WORKFLOW_ERROR, 'error');

export const loadWorkflow = () => {
  return async (dispatch) => {
    dispatch(loadWorkflowBegin());
    try {
      let result = await fakeGet();
      dispatch(loadWorkflowSuccess(result));
    } catch (error) {
      dispatch(loadWorkflowError(error));
    }
  };
};

const fakeGet = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(workflow1);
    }, 2000);
  });
};

// Bootup

// Login stuff
export const loginBeginCallback = makeActionCreator(LOGIN_CALLBACK);
export const loginSuccess = makeActionCreator(LOGIN_SUCCESS, 'user');
export const loginError = makeActionCreator(LOGIN_ERROR, 'error');
export const logoutSuccess = makeActionCreator(LOGOUT_SUCCESS);

export const loginStart = () => {
  return async (dispatch) => {
    try {
      const user = await Auth.login();
      if (user) {
        dispatch(loginSuccess(user));
        dispatch(push('/'));
      }
    } catch (error) {
      dispatch(loginError(error));
    }
  };
};

export const loginCallback = () => {
  return async (dispatch, getState) => {
    dispatch(loginBeginCallback());
    try {
      const [user, error] = await Auth.callback();
      if (error) {
        console.log(`Action: error: `, error);
        dispatch(loginError(error));
        dispatch(push('/error'));
      } else {
        dispatch(loginSuccess(user));
        dispatch(push('/'));
      }
    } catch (error) {
      dispatch(loginError(error));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      Auth.logout();
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(`Error during logout`, error);
      dispatch(logoutSuccess());
    }
  };
};

// export const startBootup = (user) => {
//   return async (dispatch) => {
//     dispatch(bootupBegin());

//     await Bootstrap(user);
//   };
// };
