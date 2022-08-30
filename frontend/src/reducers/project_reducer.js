import { RECEIVE_PROJECT, RECEIVE_USER_PROJECTS } from '../actions/project_actions'

  const ProjectsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {

    Object.freeze(state);
    let nextState = Object.assign({}, state);

    switch(action.type) {
      case RECEIVE_PROJECT:
        nextState[action.project.id] = action.project
        return nextState;
      case RECEIVE_USER_PROJECTS:
        nextState.user = action.projects;
        return nextState;
      default:
        return state;
    }
  };
  
  export default ProjectsReducer;