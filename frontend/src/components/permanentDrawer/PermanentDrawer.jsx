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

import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { makeStyles } from "@mui/styles";
import {
  AiOutlineHome,
  AiFillFolderOpen,
  AiOutlineOrderedList,
  AiOutlineCheckSquare,
  AiOutlineCalendar,
} from "react-icons/ai";
import { flexbox, style } from "@mui/system";

const drawerWidth = 240;

const PermanentDrawer = ({ currentUserName }) => {
  const drawerIcons = (text) => {
    const styles = {
      style: {
        paddingBottom: 10,
        color: "white",
      },
      size: 30,
    };

    if (text === "Home") {
      return <AiOutlineHome style={styles.style} size={styles.size} />;
    } else if (text === "Projects") {
      return <AiFillFolderOpen style={styles.style} size={styles.size} />;
    } else if (text === "Tasks") {
      return <AiOutlineOrderedList style={styles.style} size={styles.size} />;
    } else if (text === "Assign Task") {
      return <AiOutlineCheckSquare style={styles.style} size={styles.size} />;
    } else if (text === "Calendar") {
      return <AiOutlineCalendar style={styles.style} size={styles.size} />;
    }
  };

  const history = useHistory();
  const location = useLocation();

  const handleClick = (text) => {
    if (text === "Home" && location.pathname !== `/home`) {
      return history.push(`/home`);
    } else if (text === "Projects" && location.pathname !== `/projects`) {
      return history.push(`/projects`);
    } else if (text == "Tasks" && location.pathname !== `/tasks`) {
      return history.push(`/tasks`);
    } else if (text == "Assign Task" && location.pathname !== `/assigntask`) {
      return history.push(`/assigntask`);
    } else if (text == "Calendar" && location.pathname !== `/calendar`) {
      return history.push(`/calendar`);
    }
    return;
  };

  return (
    <div className="side-drawer-container">
      <div className="user-avatar">
        <p>Hi, {currentUserName}!</p>
      </div>
      {["Home", "Projects", "Tasks", "Assign Task", "Calendar"].map(
        (text, index) => (
          <ul key={`${text}-${index}`} className="side-drawer-items">
            <li onClick={() => handleClick(text)}>
              {drawerIcons(text)}
              {text}
            </li>
          </ul>
        )
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUserName: state.session.user.firstName,
});

// const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(PermanentDrawer);
