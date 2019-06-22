import { Adapter } from 'Core/Types';
import produce from 'immer';
import * as A from './actions';

const initialState = {
  loading: false,
  loadingCreate: false,
  loadingDelete: false,
  error: null,
  createError: null,
  deleteError: null,
  loadingUpdate: false,
  updateError: null,
  adapters: [] as Adapter[],
  selected: null,
};

export const adaptersReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // Misc
      case A.CLEAR_SELECTED_ADAPTER:
        draft.selected = null;
        break;

      // Load
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

      // Create
      case A.CREATE_ADAPTER_BEGIN:
        draft.loadingCreate = true;
        draft.createError = null;
        break;
      case A.CREATE_ADAPTER_SUCCESS:
        draft.loadingCreate = false;
        draft.createError = null;
        draft.adapters = [action.adapter, ...draft.adapters];
        draft.selected = action.adapter.uuid;
        break;
      case A.CREATE_ADAPTER_ERROR:
        draft.loadingCreate = false;
        draft.createError = action.error;
        break;

      // Update
      case A.UPDATE_ADAPTER_BEGIN:
        draft.loadingUpdate = true;
        draft.updateError = null;
        break;
      case A.UPDATE_ADAPTER_SUCCESS:
        draft.loadingUpdate = false;
        draft.updateError = null;
        draft.adapters = draft.adapters.map((a) => (a.uuid === action.adapter.uuid ? action.adapter : a));
        break;
      case A.UPDATE_ADAPTER_ERROR:
        draft.loadingUpdate = false;
        draft.updateError = action.error;
        break;

      // Delete
      case A.DELETE_ADAPTER_BEGIN:
        draft.loadingDelete = true;
        draft.deleteError = null;
        break;
      case A.DELETE_ADAPTER_SUCCESS:
        draft.loadingDelete = false;
        draft.deleteError = null;
        draft.adapters = draft.adapters = draft.adapters.filter((a) => a.uuid !== action.uuid);
        break;
      case A.DELETE_ADAPTER_ERROR:
        draft.loadingDelete = false;
        draft.deleteError = action.error;
        break;
    }
  });
