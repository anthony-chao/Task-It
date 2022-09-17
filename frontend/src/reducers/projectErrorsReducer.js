import {
  RECEIVE_PROJECT_ERRORS,
  CLEAR_RECEIVE_ERRORS,
} from "../actions/projectActions";

const projectErrorsReducer = (state = [], action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_PROJECT_ERRORS:
      debugger;
      return action.errors;
    case CLEAR_RECEIVE_ERRORS:
      return "";
    default:
      return state;
  }
};

export default projectErrorsReducer;
