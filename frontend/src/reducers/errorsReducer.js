import { combineReducers } from "redux";
import sessionErrorsReducer from "./sessionErrorsReducer";
import taskErrorsReducer from "./taskErrorsReducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  task: taskErrorsReducer
});

export default errorsReducer;
