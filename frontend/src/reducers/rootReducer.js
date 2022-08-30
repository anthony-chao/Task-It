import { combineReducers } from "redux";
import entitiesReducer from "./entititeReducer";
import uiReducer from "./uiReducer";
import errorsReducer from "./errorsReducer";
import sessionReducer from "./sessionReducer";

const RootReducer = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
  session: sessionReducer,
  errors: errorsReducer,
});

export default RootReducer;
