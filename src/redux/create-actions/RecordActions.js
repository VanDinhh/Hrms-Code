import * as actions from '../actions/Actions';

export const addRecord = (record) => ({
  type: actions.ADD_RECORD,
  payload: record,
});
export const deleteRecord = (id) => ({
  type: actions.DELETE_RECORD,
  payload: id,
});
export const editRecord = (record) => ({
  type: actions.EDIT_RECORD,
  payload: record,
});
