import { RECEIVE_CURRENT_USER } from "../actions/sessionActions";
import { RECEIVE_USERS } from "../actions/userActions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {
        [action.currentUser.id]: action.currentUser,
      });
    case RECEIVE_USERS:
        return Object.assign({}, state, { [action.users.id]: action.users})
    default:
      return state;
  }
};

export default usersReducer;
