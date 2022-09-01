import * as ProjectAPI from "../util/projectUtil";

export const RECEIVE_PROJECTS = "RECEIVE_PROJECTS";
export const RECEIVE_PROJECT = "RECEIVE_PROJECT";
export const REMOVE_PROJECT = "REMOVE_PROJECT";


const receiveProjects = projects => ({
    type: RECEIVE_PROJECTS,
    projects: projects.data
})

const receiveProject = project => ({
    type: RECEIVE_PROJECT,
    project : project.data
})

const removeProject = projectId => ({
    type: REMOVE_PROJECT,
    projectId
})

export const fetchProjects = () => dispatch => {
    return ProjectAPI.fetchProjects()
        .then(projects => dispatch(receiveProjects(projects)))
        .catch(err => console.log(err))
}

export const fetchProject = projectId => dispatch => {
    return ProjectAPI.fetchProject(projectId)
        .then(project => dispatch(receiveProject(project)))
        .catch(err => console.log(err))
}

export const createProject = project => dispatch => {
    return ProjectAPI.createProject(project)
        .then(project => dispatch(receiveProject(project)))
        .catch(err => console.log(err))
}

export const updateProject = project => dispatch => {
    return ProjectAPI.updateProject(project)
        .then( project => dispatch(receiveProject(project)))
        .catch(err => console.log(err))
}

export const deleteProject = projectId => dispatch => {
    return ProjectAPI.deleteProject(projectId)
        .then( () => dispatch(removeProject(projectId)))
        .catch(err => console.log(err))
}

export const fetchUserProjects = userId => dispatch => {
    return ProjectAPI.fetchUserProjects(userId)
        .then( projects => dispatch(receiveProjects(projects)))
        .catch(err => console.log(err))
}