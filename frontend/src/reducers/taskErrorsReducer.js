import {
  RECEIVE_TASK_ERRORS,
  CLEAR_RECEIVE_ERRORS,
} from "../actions/taskActions";

const _nullErrors = [];

const taskErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_TASK_ERRORS:
      return action.errors;
    case CLEAR_RECEIVE_ERRORS:
      return "";
    default:
      return state;
  }
};

export default taskErrorsReducer;
