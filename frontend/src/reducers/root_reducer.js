import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import errorsReducer from './errors_reducer';

const RootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
});

export default RootReducer;