import * as TaskAPI from "../util/taskUtil"

export const RECEIVE_TASKS = "RECEIVE_TASKS";
export const RECEIVE_TASK = "RECEIVE_TASK";
export const REMOVE_TASK = "REMOVE_TASK";

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

export const fetchAllTasks = () => dispatch => {
    return TaskAPI.fetchAllTasks()
        .then( tasks => dispatch(receiveTasks(tasks)))
}

export const fetchProjectTasks = projectId => dispatch => {
    return TaskAPI.fetchProjectTasks(projectId)
        .then( tasks => dispatch(receiveTasks(tasks)))
}

export const fetchUserTasks = userId => dispatch => {
    return TaskAPI.fetchUserTasks(userId)
        .then( tasks => dispatch(receiveTasks(tasks)))
}

export const fetchTask = taskId => dispatch => {
    return TaskAPI.fetchTask(taskId)
        .then( task => dispatch(receiveTask(task)))
}

export const createTask = task => dispatch => {
    return TaskAPI.createTask(task)
        .then( task => dispatch(receiveTask(task)))
}

export const updateTask = task => dispatch => {
    return TaskAPI.updateTask(task)
        .then( task => dispatch(receiveTask(task)))
}

export const updateAssignedTask = task => dispatch => {
    return TaskAPI.updateAssignedTask(task)
        .then( task => dispatch(receiveTask(task)))
}

export const deleteTask = taskId => dispatch => {
    return TaskAPI.deleteTask(taskId)
        .then( () => dispatch(removeTask(taskId)))
}

