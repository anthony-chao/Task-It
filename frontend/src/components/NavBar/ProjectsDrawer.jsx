import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { TbCircles } from 'react-icons/tb';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { openModal } from '../../actions/modalActions';
import { connect } from 'react-redux';
import { fetchUserProjects, fetchProject } from '../../actions/projectActions'; 
import Task from '../task/Task'
import { FcFlowChart, FcMindMap, FcAddDatabase } from 'react-icons/fc';

const ProjectsDrawer = ({ openModal, fetchUserProjects, userProjects, currentUserId, fetchProject }) => {
  const [state, setState] = useState({
    left: false,
  });

   const toggleDrawer = (projects, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [projects]: open });
  };

  // useEffect(() => {
  //   fetchUserProjects(currentUserId);
  // }, []);

  let history = useHistory();

  const handleClick = projectId => {
    return history.push(`/dashboard/projects/${projectId}`)
  }

  const list = (projects) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(projects, false)}
      onKeyDown={toggleDrawer(projects, false)}
    >
      <List>
        {['All Projects'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FcMindMap size={'1.5em'} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Create a Project'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => openModal('createProject')} >
              <ListItemIcon>
                <FcAddDatabase size={'1.5em'} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {userProjects.map((project, index) => (
          <ListItem key={project._id} disablePadding>
            <ListItemButton onClick={() => handleClick(project._id)}>
              <ListItemIcon>
                <FcFlowChart size={'1.5em'} />
              </ListItemIcon>
              <ListItemText primary={project.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['projects'].map((projects) => (
        <React.Fragment key={projects}>
          <Button onClick={toggleDrawer(projects, true)}>{projects}</Button>
          <Drawer
            projects={projects}
            open={state[projects]}
            onClose={toggleDrawer(projects, false)}
          >
            {list(projects)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  userProjects: Object.values(state.entities.projects),
  currentUserId: state.session.user.id
})

const mapDispatchToProps = dispatch => ({
  openModal: (formType, project) => dispatch(openModal(formType, project)),
  fetchUserProjects: (userId) => dispatch(fetchUserProjects(userId)),
  fetchProject: (projectId) => dispatch(fetchProject(projectId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsDrawer))