import { combineReducers } from "redux";
import SessionErrorsReducer from "./sessionErrorsReducer";

const errorsReducer = combineReducers({
  session: SessionErrorsReducer,
});

export default errorsReducer;
