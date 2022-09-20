import { 
    RECEIVE_TASKS, 
    RECEIVE_TASK,
    REMOVE_TASK,
    RECEIVE_PROJECT_TASKS,
    RECEIVE_USER_TASKS
} from "../actions/taskActions";
import { RECEIVE_PROJECTS, RECEIVE_PROJECT } from "../actions/projectActions";

const tasksReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_TASKS:
            nextState = {};
            action.tasks.forEach(task => {
                nextState = Object.assign(nextState, { [task._id] : task })
            })
            return nextState;
        case RECEIVE_TASK:
            return Object.assign({}, state, { [action.task.data._id]: action.task.data})
        case REMOVE_TASK:
            delete nextState[action.taskId]
            return nextState;
        case RECEIVE_PROJECT_TASKS:
            nextState = {};
            action.payload.tasks.forEach(task => {
                nextState = Object.assign(nextState, { [task._id] : task })
            })
            return nextState;
        case RECEIVE_USER_TASKS:
            nextState = {};
            action.payload.tasks.forEach(task => {
                nextState = Object.assign(nextState, { [task._id] : task })
            })
            return nextState;
        case RECEIVE_PROJECTS:
            return state;
        default:
            return state;
    }
}

export default tasksReducer;