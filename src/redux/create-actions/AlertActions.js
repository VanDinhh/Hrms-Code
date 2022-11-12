import * as actions from '../actions/Actions';

export const showAlert = (message) => ({
  type: actions.SHOW_ALERT,
  payload: message,
});
export const closeAlert = () => ({
  type: actions.CLOSE_ALERT,
});
