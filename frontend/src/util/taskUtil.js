import axios from "axios";

export const fetchTasks = projectId => {
    return axios.get(`/api/tasks/${projectId}`)
}
// export const fetchTasks = () => {
//     return axios.get("/api/tasks")
// }

export const fetchTask = taskId => {
    return axios.get(`/api/projects/tasks/${taskId}`)
}

export const createTask = task => {
    return axios.post(`/api/projects/:id`, task)
}

export const updateTask = taskId => {
    return axios.patch(`/api/projects/tasks/${taskId}`)
}

export const deleteTask = taskId => {
    return axios.delete(`/api/projects/tasks/${taskId}`)
}

export const fetchAllTasks = () => {
    return axios.get('api/tasks')
}

export const fetchAllUsers = () => {
    return axios.get("api/users")
}