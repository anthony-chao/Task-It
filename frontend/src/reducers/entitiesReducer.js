import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import projectsReducer from "./projectsReducer";

const entitiesReducer = combineReducers({
  projects: projectsReducer,
  users: usersReducer
});

export default entitiesReducer;
