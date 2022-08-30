import { combineReducers } from "redux";
import modalReducer from "./modalReducer";

const uiReducer = combineReducers({
  modal: modalReducer,
});

export default uiReducer;
