import { combineReducers } from "redux";
import sessionErrorsReducer from "./sessionErrorsReducer";
import taskErrorsReducer from "./taskErrorsReducer";
import projectErrorsReducer from "./projectErrorsReducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  task: taskErrorsReducer,
  project: projectErrorsReducer,
});

export default errorsReducer;
