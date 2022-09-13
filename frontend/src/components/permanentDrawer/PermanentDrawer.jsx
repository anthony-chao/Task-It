// import React, { useState, useEffect } from "react";
// import { useHistory, withRouter } from "react-router-dom"
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import Button from '@mui/material/Button';
// import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import { TbCircles } from 'react-icons/tb';
// import { MdOutlineCreateNewFolder } from 'react-icons/md';
// import { MdSubject } from 'react-icons/md';
// import { MdModeEditOutline } from 'react-icons/md';
// import { openModal } from '../../actions/modalActions';
// import { connect } from 'react-redux';
// import { fetchUserProjects, fetchProject } from '../../actions/projectActions'; 
// import Task from '../task/task';
// import { FcParallelTasks } from 'react-icons/fc';

// const ProjectsDrawer = ({ openModal, fetchUserProjects, userProjects, currentUserId, fetchProject }) => {
//   const [state, setState] = useState({
//     left: false,
//   });

//    const toggleDrawer = (projects, open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [projects]: open });
//   };

//   // useEffect(() => {
//   //   fetchUserProjects(currentUserId);
//   // }, []);

//   let history = useHistory();

//   const handleClick = projectId => {
//     return history.push(`/dashboard/projects/${projectId}`)
//   }

//   const list = (projects) => (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(projects, false)}
//       onKeyDown={toggleDrawer(projects, false)}
//     >
//       <List>
//         {['All Projects'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 <TbCircles size={'1.5em'} />
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['Create a Project'].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton onClick={() => openModal('createProject')} >
//               <ListItemIcon>
//                 <MdOutlineCreateNewFolder size={'1.5em'} />
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <List>
//         {userProjects.map((project, index) => (
//           <ListItem key={project._id} disablePadding>
//             <ListItemButton onClick={() => handleClick(project._id)}>
//               <ListItemIcon>
//                 <FcParallelTasks size={'1.5em'} />
//               </ListItemIcon>
//               <ListItemText primary={project.name} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <div>
//       {['projects'].map((projects) => (
//         <React.Fragment key={projects}>
//           <Button onClick={toggleDrawer(projects, true)}>{projects}</Button>
//           <Drawer
//             projects={projects}
//             open={state[projects]}
//             onClose={toggleDrawer(projects, false)}
//           >
//             {list(projects)}
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }

import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { makeStyles } from '@mui/styles';
import Home from '../home/Home';

const drawerWidth = 240;

const useStyles = makeStyles({
  page: {
    background: '#add8e6',
    width: '100%',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  root: {
    display: 'flex'
  }
})

const PermanentDrawer = ({currentUserId}) => {

  const classes = useStyles();
  
  const ListIcons = () => {
    return
  }
  
  const history = useHistory();
  const location = useLocation();
  
  const handleClick = (text) => {
    if (text === "Projects" && location.pathname !== `/projects/${currentUserId}`) {
      return history.push(`/projects/${currentUserId}`);
    }
    return;
  }
  
  return (  
    // <div className={classes.root}>
    //   {/* AppBar
    //   side drawer */}
    //   <Drawer 
    //     className={classes.drawer} 
    //     variant='permanent' 
    //     anchor='left'
    //     classes={{ paper: classes.drawerPaper }}
    //   >
    //     <div>
    //       <Typography variant="h5">
    //         User name and Avatar
    //       </Typography>
    //     </div>
    //   </Drawer>

    //   <div className={classes.page}>
    //     <div className='home-container'>
    //     </div>
    //   </div>
    // </div>

    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider style={{ height: '40px'}}/>
        <List>
          {['Projects', 'Tasks', 'Assign Task', 'Calendar', 'Logout'].map((text, index) => (
            <ListItem key={`${text}-${index}`} disablePadding onClick={() => handleClick(text)}>
              <ListItemButton>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}

                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}

const mapStateToProps = state => ({
  // userProjects: Object.values(state.entities.projects),
  currentUserId: state.session.user.id
})

const mapDispatchToProps = dispatch => ({
  // openModal: (formType, project) => dispatch(openModal(formType, project)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PermanentDrawer);