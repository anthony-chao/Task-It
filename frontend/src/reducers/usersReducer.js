import { RECEIVE_CURRENT_USER } from "../actions/sessionActions";
import { RECEIVE_USERS } from "../actions/userActions";
import { RECEIVE_PROJECT_TASKS, RECEIVE_USER_TASKS } from "../actions/taskActions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {
        [action.currentUser.id]: action.currentUser,
      });
    case RECEIVE_USERS:
        nextState = {};
        action.users.forEach(user => {
            nextState = Object.assign(nextState, { [user._id] : user })
        });
        return nextState;
    case RECEIVE_PROJECT_TASKS:
      nextState = {};
      action.payload.users.forEach(user => {
          nextState = Object.assign(nextState, { [user._id] : user })
      });
      return nextState;
    case RECEIVE_USER_TASKS:
      nextState = {};
      action.payload.users.forEach(user => {
          nextState = Object.assign(nextState, { [user._id] : user })
      });
      return nextState;
    default:
      return state;
  }
};

export default usersReducer;
