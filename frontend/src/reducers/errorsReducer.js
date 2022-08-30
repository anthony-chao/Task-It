import { combineReducers } from "redux";
import sessionErrorsReducer from "./sessionErrorsReducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
});

export default errorsReducer;
