import axios from "axios";

// GET ALL PROJECTS
export const fetchProjects = () => {
    return axios.get("/api/projects")
};

// GET USER'S PROJECTS
export const fetchUserProjects = userId => {
    return axios.get(`/api/projects/users/${userId}`)
}

// GET PROJECT BY PROJECT ID
export const fetchProject = projectId => {
    return axios.get(`/api/projects/${projectId}`)
}

// CREATE PROJECT
export const createProject = project => {
    return axios.post('/api/projects/', project)
}

// UPDATE PROJECT
export const updateProject = project => {
    return axios.patch(`/api/projects/${project._id}`, project)
}

// DELETE PROJECT
export const deleteProject = projectId => {
    return axios.delete(`/api/projects/${projectId}`)
}
