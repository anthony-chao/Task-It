import axios from "axios";

export const fetchProjects = () => {
    return axios.get("/api/projects")
};

export const fetchProject = projectId => {
    return axios.get(`/api/projects/${projectId}`)
}

export const createProject = project => {
    return axios.post('/api/projects/', project)
}

export const updateProject = projectId => {
    return axios.patch(`/api/projects/${projectId}`)
}

export const deleteProject = projectId => {
    return axios.delete(`/api/projects/${projectId}`)
}

export const fetchUserProjects = userId => {
    return axios.get(`/api/projects/users/${userId}`)
}

export const fetchTasks = projectId => {
    return axios.get(`/api/projects/${projectId}/tasks`)
}

export const fetchTask = (projectId, taskId) => {
    return axios.get(`/api/projects/${projectId}/${taskId}`)
}