import { RECEIVE_TASKS, RECEIVE_TASK, REMOVE_TASK } from "../actions/taskActions";
import { RECEIVE_PROJECTS, RECEIVE_PROJECT } from "../actions/projectActions";

const tasksReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_TASKS:
            return action.tasks
        case RECEIVE_TASK:
            return Object.assign({}, state, { [action.task._id]: action.task})  
        case REMOVE_TASK:
            delete nextState[action.taskId]
            return nextState;
        case RECEIVE_PROJECT:
            const tasksObj = {};
            action.payload.tasks.forEach(task => {
                tasksObj[task._id] = task
            });
            return Object.assign({}, state, tasksObj)
        case RECEIVE_PROJECTS:
            return state;
        default:
            return state;
    }
}

export default tasksReducer;