import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import projectsReducer from "./projectsReducer";
import tasksReducer from "./taskReducer";

const entitiesReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
  users: usersReducer,
});

export default entitiesReducer;
