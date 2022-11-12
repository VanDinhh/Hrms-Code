import * as actions from '../actions/Actions';

export const initialState = {
  open: false,
  message: '',
  type: 'success',
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SHOW_ALERT: {
      return {
        ...state,
        open: true,
        ...action.payload,
      };
    }
    case actions.CLOSE_ALERT: {
      return {
        ...state,
        open: false,
        message: '',
      };
    }
    default: {
      return state;
    }
  }
};

export default alertReducer;
