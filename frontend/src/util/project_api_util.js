import axios from 'axios';

export const getUserProjects = (userId) => {
  return axios.get(`/api/projects/users/${userId}`)
};

export const getProject = id => {
  return axios.get(`/api/projects/${id}`)
};

export const addMember = (id, data) => {
    return axios.patch(`/api/projects/${id}/addMember`, data)
}

export const deleteMember = (id, data) => {
    return axios.patch(`/api/projects/${id}/deleteMember`, data)
}

export const addProject = data => {
  return axios.post('/api/projects/', data)
}

export const addTask = (id, data) => {
    return axios.post(`api/projects/${id}`, data)
}