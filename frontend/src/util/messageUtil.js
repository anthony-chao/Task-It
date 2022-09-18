import axios from "axios";

export const fetchMessages = () => {
  return axios.get(`/api/messages`)
}

export const createMessage = message => {
  return axios.post(`/api/messages/`, message)
}