import { RECEIVE_CURRENT_USER } from "../actions/sessionActions";
import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modalActions";

const modalReducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return null;
    case OPEN_MODAL:
      return action.modal;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
};

export default modalReducer;
