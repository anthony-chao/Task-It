import axios from "axios";

export const fetchTasks = projectId => {
    return axios.get(`/api/projects/${projectId}`)
}
// export const fetchTasks = () => {
//     return axios.get("/api/tasks")
// }

export const fetchTask = taskId => {
    return axios.get(`/api/projects/tasks/${taskId}`)
}

export const createTask = (projectId, task) => {
    return axios.post(`/api/projects/${projectId}`, task)
}

export const updateTask = (projectId, task) => {
    return axios.patch(`/api/projects/${projectId}/tasks/${task._id}`, task)
}

export const deleteTask = taskId => {
    return axios.delete(`/api/tasks/${taskId}`)
}

export const fetchAllTasks = () => {
    return axios.get('api/tasks')
}

export const fetchUserTasks = (userId) => {
    return axios.get(`api/tasks/user/${userId}`)
}