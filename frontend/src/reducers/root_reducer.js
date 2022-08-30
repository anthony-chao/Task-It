import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import errorsReducer from './errors_reducer';
import projectReducer from './project_reducer'

const RootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer,
  project: projectReducer
});

export default RootReducer;