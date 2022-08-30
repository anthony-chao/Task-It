import { combineReducers } from "redux";
import usersReducer from "./usersReducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
});

export default entitiesReducer;
