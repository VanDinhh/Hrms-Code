import { combineReducers } from 'redux';
import recordReducer from './RecordReducer';
import alertReducer from './AlertReducer';

const Reducer = combineReducers({
  record: recordReducer,
  alert: alertReducer,
});

export default Reducer;
