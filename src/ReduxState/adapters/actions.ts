import { getData } from 'Core/Data';
import { makeActionCreator } from 'ReduxState/actions';

// Adapter Actions
export const LOAD_ADAPTERS_BEGIN = 'LOAD_ADAPTERS_BEGIN';
export const LOAD_ADAPTERS_SUCCESS = 'LOAD_ADAPTERS_SUCCESS';
export const LOAD_ADAPTERS_ERROR = 'LOAD_ADAPTERS_ERROR';
export const loadAdaptersBegin = makeActionCreator(LOAD_ADAPTERS_BEGIN);
export const loadAdaptersSuccess = makeActionCreator(LOAD_ADAPTERS_SUCCESS, 'adapters');
export const loadAdaptersError = makeActionCreator(LOAD_ADAPTERS_ERROR, 'error');

export const CREATE_ADAPTER_BEGIN = 'CREATE_ADAPTER_BEGIN';
export const CREATE_ADAPTER_SUCCESS = 'CREATE_ADAPTER_SUCCESS';
export const CREATE_ADAPTER_ERROR = 'CREATE_ADAPTER_ERROR';
export const createAdapterBegin = makeActionCreator(CREATE_ADAPTER_BEGIN);
export const createAdapterSuccess = makeActionCreator(CREATE_ADAPTER_SUCCESS, 'adapter');
export const createAdapterError = makeActionCreator(CREATE_ADAPTER_ERROR, 'error');

export const loadAdapters = () => {
  return async (dispatch, getState) => {
    dispatch(loadAdaptersBegin());
    const q = `{
      adapters {
        uuid
        icon
        name
        description
        version
      }
    }`;
    let { data, error } = await getData(q);

    if (error) dispatch(loadAdaptersError(error));
    if (data) dispatch(loadAdaptersSuccess(data.adapters));
  };
};

export const createDefaultAdapter = () => {
  return async (dispatch) => {
    dispatch(createAdapterBegin());
    const q = `mutation{
      createDefaultAdapter {
        uuid
        name
        version
        icon
        description
        files
        created_at
        updated_at
      }
    }`;
    let { data, error } = await getData(q);

    if (error) dispatch(createAdapterError(error));
    if (data) dispatch(createAdapterSuccess(data.createDefaultAdapter));
  };
};
