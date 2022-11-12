import * as actions from '../actions/Actions';
import { record } from '../../constant/data';
import { generate } from '../../utils/function';

const initData = JSON.parse(localStorage.getItem('record'));

export const initialState = initData === null ? record : initData;

const recordReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_RECORD: {
      let newState = [...state];
      const newEmployee = generate(action.payload);
      newState = [...newState, newEmployee];
      localStorage.setItem('record', JSON.stringify(newState));
      return newState;
    }
    case actions.DELETE_RECORD: {
      const newState = state.filter((e) => e.id !== action.payload);
      localStorage.setItem('record', JSON.stringify(newState));
      return newState;
    }
    case actions.EDIT_RECORD: {
      let newState = [...state];
      let index = state.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) newState[index] = action.payload;
      localStorage.setItem('record', JSON.stringify(newState));
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default recordReducer;
