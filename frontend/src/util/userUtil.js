import axios from "axios";

export const fetchUsers = () => {
    return axios.get(`/api/users`)
};

export const fetchUser = userId => {
    return axios.get(`/api/users/${userId}`)
}