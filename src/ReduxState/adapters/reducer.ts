import { Adapter } from 'Core/Types';
import produce from 'immer';
import * as A from './actions';

const initialState = {
  loading: true,
  error: null,
  adapters: [] as Adapter[],
  loadingCreate: false,
  createError: null,
};

export const adaptersReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case A.LOAD_ADAPTERS_BEGIN:
        draft.loading = true;
        draft.error = null;
        draft.adapters = [];
        break;
      case A.LOAD_ADAPTERS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        draft.adapters = [];
        break;
      case A.LOAD_ADAPTERS_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.adapters = action.adapters;
        break;
      case A.CREATE_ADAPTER_BEGIN:
        draft.loadingCreate = true;
        draft.createError = null;
        break;
      case A.CREATE_ADAPTER_SUCCESS:
        draft.loadingCreate = false;
        draft.createError = null;
        draft.adapters = [action.adapter, ...draft.adapters];
        break;
      case A.CREATE_ADAPTER_ERROR:
        draft.loadingCreate = false;
        draft.createError = action.error;
        break;
    }
  });
