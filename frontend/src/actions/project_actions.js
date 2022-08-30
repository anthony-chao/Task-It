import * as APIUtil from '../util/project_api_util'

export const RECEIVE_PROJECT = "RECEIVE_PROJECT";
export const RECEIVE_USER_PROJECTS = "RECEIVE_USER_PROJECTS";

export const receiveProject = project => ({
  type: RECEIVE_PROJECT,
  project
});

export const receiveUserProjects = projects => ({
  type: RECEIVE_USER_PROJECTS,
  projects
});

export const fetchProject = id => dispatch => (
  APIUtil.getProject(id)
        .then(project => dispatch(receiveProject(project)))
        .catch(err => console.log(err))
);

export const fetchUserProjects = userId => dispatch => (
  APIUtil.getUserProjects(userId)
        .then(projects => dispatch(receiveUserProjects(projects)))
        .catch(err => console.log(err))
);

export const addProjectMembers = (projectId, data) => dispatch => (
  APIUtil.addMember(projectId, data)
        .then(project => dispatch(receiveProject(project)))
        .catch(err => console.log(err))
);

export const removeProjectMembers = (projectId, data) => dispatch => (
    APIUtil.deleteMember(projectId, data)
        .then(project => dispatch(receiveProject(project)))
        .catch(err => console.log(err))
  );

export const addProject = data => dispatch => (
    APIUtil.addProject(data)
        .then(project => dispatch(receiveProject(project)))
        .catch(err => console.log(err))
)

export const addTask = (projectId, data) => dispatch => (           // I'm not too sure on this action...
    APIUtil.addTask(projectId, data)
        .then(project => dispatch(receiveProject(project)))
        .catch(err => console.log(err))
)