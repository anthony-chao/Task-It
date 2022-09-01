import React, { useState } from "react";
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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { openModal } from '../../actions/modalActions';
import { connect } from 'react-redux';

const ProjectsDrawer = ({ openModal }) => {
  const [state, setState] = useState({
    left: false,
  });

   const toggleDrawer = (projects, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [projects]: open });
  };

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
                <TbCircles size={'1.5em'} />
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
                <MdOutlineCreateNewFolder size={'1.5em'} />
              </ListItemIcon>
              <ListItemText primary={text} />
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

})

const mapDispatchToProps = dispatch => ({
  openModal: (formType) => dispatch(openModal(formType))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsDrawer)