import * as TaskAPI from "../util/taskUtil"

export const RECEIVE_TASKS = "RECEIVE_TASKS";
export const RECEIVE_TASK = "RECEIVE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";

const receiveTasks = tasks => ({
    type: RECEIVE_TASKS,
    tasks
})

const receiveTask = task => ({
    type: RECEIVE_TASK,
    task
})

const removeTask = taskId => ({
    type: REMOVE_TASK,
    taskId
})

export const fetchTasks = projectId => dispatch => {
    return TaskAPI.fetchTasks(projectId)
        .then( tasks => dispatch(receiveTasks(tasks)))
}

export const fetchTask = taskId => dispatch => {
    return TaskAPI.fetchTasks(taskId)
        .then( task => dispatch(receiveTask(task)))
}

export const createTask = (projectId, task) => dispatch => {
    return TaskAPI.createTask(projectId, task)
        .then( task => dispatch(receiveTask(task)))
}

export const updateTask = (projectId, task) => dispatch => {
    return TaskAPI.updateTask(projectId, task)
        .then( task => dispatch(receiveTask(task)))
}

export const deleteTask = taskId => dispatch => {
    return TaskAPI.deleteTask(taskId)
        .then( () => dispatch(removeTask(taskId)))
}

// ASSIGNING USERS TO TASKS

export const fetchAllTasks = () => dispatch => {
    return TaskAPI.fetchAllTasks()
        .then( (tasks) => dispatch(receiveTasks(tasks)))
}

// FETCHING ALL USER'S TASKS

export const fetchUserTasks = userId => dispatch => {
    return TaskAPI.fetchUserTasks(userId)
        .then( tasks => dispatch(receiveTasks(tasks)))
}