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

export const UPDATE_ADAPTER_BEGIN = 'UPDATE_ADAPTER_BEGIN';
export const UPDATE_ADAPTER_SUCCESS = 'UPDATE_ADAPTER_SUCCESS';
export const UPDATE_ADAPTER_ERROR = 'UPDATE_ADAPTER_ERROR';
export const updateAdapterBegin = makeActionCreator(UPDATE_ADAPTER_BEGIN);
export const updateAdapterSuccess = makeActionCreator(UPDATE_ADAPTER_SUCCESS, 'adapter');
export const updateAdapterError = makeActionCreator(UPDATE_ADAPTER_ERROR, 'error');

export const DELETE_ADAPTER_BEGIN = 'DELETE_ADAPTER_BEGIN';
export const DELETE_ADAPTER_SUCCESS = 'DELETE_ADAPTER_SUCCESS';
export const DELETE_ADAPTER_ERROR = 'DELETE_ADAPTER_ERROR';
export const deleteAdapterBegin = makeActionCreator(DELETE_ADAPTER_BEGIN);
export const deleteAdapterSuccess = makeActionCreator(DELETE_ADAPTER_SUCCESS, 'uuid');
export const deleteAdapterError = makeActionCreator(DELETE_ADAPTER_ERROR, 'error');

export const CLEAR_SELECTED_ADAPTER = 'CLEAR_SELECTED_ADAPTER';
export const clearSelectedAdapter = makeActionCreator(CLEAR_SELECTED_ADAPTER);

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
    console.log(`loadAdapters:getData`);
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

export const updateAdapter = (uuid, changes) => {
  return async (dispatch) => {
    dispatch(updateAdapterBegin());
    const q = `mutation _($uuid:String, $updates: AdapterUpdates){
      updateAdapter(uuid:$uuid, updates:$updates) {
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
    const v = {
      uuid,
      updates: changes,
    };
    let { data, error } = await getData(q, v);

    if (error) dispatch(updateAdapterError(error));
    if (data) dispatch(updateAdapterSuccess(data.updateAdapter));
  };
};

export const deleteAdapter = (uuid) => {
  return async (dispatch) => {
    dispatch(deleteAdapterBegin());
    const q = `mutation _($uuid:String){
      deleteAdapter(uuid:$uuid)
    }`;
    const v = { uuid };
    let { data, error } = await getData(q, v);

    // TODO: check for workflows received here?
    if (error) dispatch(deleteAdapterError(error));
    if (data) dispatch(deleteAdapterSuccess(data.deleteAdapter));
  };
};
