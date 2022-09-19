import * as TaskAPI from "../util/taskUtil"

export const RECEIVE_TASKS = "RECEIVE_TASKS";
export const RECEIVE_TASK = "RECEIVE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const RECEIVE_PROJECT_TASKS = "RECEIVE_PROJECT_TASKS"
export const RECEIVE_USER_TASKS = "RECEIVE_USER_TASKS"

const receiveTasks = tasks => ({
    type: RECEIVE_TASKS,
    tasks: tasks.data
})

const receiveTask = task => ({
    type: RECEIVE_TASK,
    task
})

const removeTask = taskId => ({
    type: REMOVE_TASK,
    taskId
})

const receiveProjectTasks = payload => ({
    type: RECEIVE_PROJECT_TASKS,
    payload: payload.data
})

const receiveUserTasks = payload => ({
    type: RECEIVE_USER_TASKS,
    payload: payload.data
})

export const fetchAllTasks = () => dispatch => {
    return TaskAPI.fetchAllTasks()
        .then( tasks => dispatch(receiveTasks(tasks)))
}

export const fetchProjectTasks = projectId => dispatch => {
    return TaskAPI.fetchProjectTasks(projectId)
        .then( tasks => dispatch(receiveProjectTasks(tasks)))
}

export const fetchUserTasks = userId => dispatch => {
    return TaskAPI.fetchUserTasks(userId)
        .then( tasks => dispatch(receiveUserTasks(tasks)))
}

export const fetchTask = taskId => dispatch => {
    return TaskAPI.fetchTask(taskId)
        .then( task => dispatch(receiveTask(task)))
}

export const createTask = task => dispatch => {
    return TaskAPI.createTask(task)
        .then( task => dispatch(receiveTask(task)))
        .catch((err) => dispatch(receiveErrors(err.response.data)));
    }

export const updateTask = task => dispatch => {
    return TaskAPI.updateTask(task)
        .then( task => dispatch(receiveTask(task)))
        .catch((err) => dispatch(receiveErrors(err.response.data)));
}

// export const updateAssignedTask = task => dispatch => {
//     return TaskAPI.updateAssignedTask(task)
//         .then( task => dispatch(receiveTask(task)))
// }

export const updateAssignedTask = (taskId, userId) => dispatch => {
    return TaskAPI.updateAssignedTask(taskId, userId)
        .then( task => dispatch(receiveTask(task)))
}

export const deleteTask = taskId => dispatch => {
    return TaskAPI.deleteTask(taskId)
        .then( () => dispatch(removeTask(taskId)))
}

// task error handling
export const RECEIVE_TASK_ERRORS = "RECEIVE_TASK_ERRORS";
export const CLEAR_RECEIVE_ERRORS = "CLEAR_RECEIVE_ERRORS";

export const receiveErrors = (errors) => ({
    type: RECEIVE_TASK_ERRORS,
    errors,
  });
  
  export const clearReceiveErrors = () => {
    return {
      type: CLEAR_RECEIVE_ERRORS,
    };
  };