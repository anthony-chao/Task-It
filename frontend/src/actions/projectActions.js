import * as ProjectAPI from "../util/projectUtil";

export const RECEIVE_PROJECTS = "RECEIVE_PROJECTS";
export const RECEIVE_PROJECT = "RECEIVE_PROJECT";
export const REMOVE_PROJECT = "REMOVE_PROJECT";
export const RECEIVE_PROJECT_ERRORS = "RECEIVE_PROJECT_ERRORS";
export const CLEAR_RECEIVE_ERRORS = "CLEAR_RECEIVE_ERRORS";

const receiveProjects = (projects) => ({
  type: RECEIVE_PROJECTS,
  projects: projects.data,
});

const receiveProject = (project) => ({
  type: RECEIVE_PROJECT,
  project: project.data,
});

const removeProject = (projectId) => ({
  type: REMOVE_PROJECT,
  projectId,
});

const receiveProjectErrors = (errors) => {
  return {
    type: RECEIVE_PROJECT_ERRORS,
    errors,
  };
};

export const clearReceiveErrors = () => ({
  type: CLEAR_RECEIVE_ERRORS,
});

export const fetchProjects = () => (dispatch) => {
  return ProjectAPI.fetchProjects()
    .then((projects) => dispatch(receiveProjects(projects)))
    .catch((err) => console.log(err));
};

export const fetchUserProjects = (userId) => (dispatch) => {
  return ProjectAPI.fetchUserProjects(userId)
    .then((projects) => dispatch(receiveProjects(projects)))
    .catch((err) => console.log(err));
};

export const fetchProject = (projectId) => (dispatch) => {
  return ProjectAPI.fetchProject(projectId)
    .then((project) => dispatch(receiveProject(project)))
    .catch((err) => console.log(err));
};

export const createProject = (project) => (dispatch) => {
  return ProjectAPI.createProject(project)
    .then((project) => dispatch(receiveProject(project)))
    .catch((err) => {
      dispatch(receiveProjectErrors(err.response.data));
    });
};

export const updateProject = (project) => (dispatch) => {
  return ProjectAPI.updateProject(project)
    .then((project) => dispatch(receiveProject(project)))
    .catch((err) => {
      dispatch(receiveProjectErrors(err.response.data));
    });
};

export const deleteProject = (projectId) => (dispatch) => {
  return ProjectAPI.deleteProject(projectId)
    .then(() => dispatch(removeProject(projectId)))
    .catch((err) => console.log(err));
};
