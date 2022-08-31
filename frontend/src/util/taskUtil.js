import axios from "axios";

// export const fetchTasks = () => {
//     return axios.get("/api/projects/:projectId/tasks")
// }
// export const fetchTasks = () => {
//     return axios.get("/api/tasks")
// }

export const fetchTask = taskId => {
    return axios.get(`/api/projects/tasks/${taskId}`)
}

export const createTask = task => {
    return axios.post(`/api/projects/tasks`, task)
}

export const updateTask = taskId => {
    return axios.patch(`/api/projects/tasks/${taskId}`)
}

export const deleteTask = taskId => {
    return axios.delete(`/api/projects/tasks/${taskId}`)
}