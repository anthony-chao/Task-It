import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BiEditAlt, BiTrashAlt } from 'react-icons/bi';
import { openModal } from "../../actions/modalActions";

const ProjectsIndexItem = ({ project, openModal }) => {
  const { name, description } = project

  const handleUpdateClick = () => {
    
  }
  
  
  return (
    <div className="project-index-item">
      <div className="project-info">
        <ul>
          <li className="project-name">Project Name: {name}</li>
          <li className="project-desc">Description: {description}</li>
        </ul>
      </div>

      <div className="update-delete-buttons">
        <BiEditAlt size={20} style={{ paddingRight: 10, paddingBottom: 10, color: 'black' }} onClick={() => openModal('updateProject')} />
        <BiTrashAlt size={20} style={{ paddingRight: 20, color: 'black' }} />
      </div>
    </div>
  );
}

const mSTP = state => {
  
}

const mDTP = dispatch => {
  return {
    openModal: formType => dispatch(openModal(formType))
  }
}

export default connect(null, mDTP)(ProjectsIndexItem);