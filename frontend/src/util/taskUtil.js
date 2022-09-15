import axios from "axios";

// GET ALL TASKS
export const fetchAllTasks = () => {
  return axios.get("/api/tasks");
};

// GET TASKS FOR A PROJECT
export const fetchProjectTasks = (projectId) => {
  return axios.get(`api/tasks/projects/${projectId}`);
};

// GET ALL USER'S TASKS
export const fetchUserTasks = (userId) => {
  return axios.get(`/api/tasks/user/${userId}`);
};

// GET SPECIFIC TASK BY TASK ID
export const fetchTask = (taskId) => {
  return axios.get(`/api/tasks/${taskId}`);
};

// CREATE TASK
export const createTask = (task) => {
  return axios.post(`/api/tasks`, task);
};

// UPDATE TASK DESCRIPTION AND STATUS
export const updateTask = (task) => {
  return axios.patch(`/api/tasks/${task._id}`, task);
};

// UPDATE TASK ASSIGNED USER
// export const updateAssignedTask = task => {
//     return axios.patch(`/api/tasks/assignTask/${task._id}`, task)
// }
export const updateAssignedTask = (taskId, assignedUser) => {
  return axios.patch(`/api/tasks/assignTask/${taskId}`, {
    assignedUser: assignedUser,
  });
};

// DELETE A TASK
export const deleteTask = (taskId) => {
  return axios.delete(`/api/tasks/${taskId}`);
};
