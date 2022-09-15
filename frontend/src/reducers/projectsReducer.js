import { RECEIVE_PROJECTS, RECEIVE_PROJECT, REMOVE_PROJECT } from "../actions/projectActions";

const projectsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_PROJECTS:
            action.projects.forEach(project => {
                nextState = Object.assign(nextState, { [project._id] : project })
            });
            return nextState;
        case RECEIVE_PROJECT:
            return Object.assign({}, state, { [action.project._id]: action.project})
        case REMOVE_PROJECT:
            delete nextState[action.projectId]
            return nextState;
        default:
            return state;
    }
}

export default projectsReducer;