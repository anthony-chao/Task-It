import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateTask } from '../../actions/taskActions';
import { closeModal } from '../../actions/modalActions';

const UpdateTaskForm = (props) => {

    const [state, setState] = useState({
      _id: props.task._id,
      description: props.task.description,
      status: props.task.status,
      projectId: props.task.projectId,
      assignedUser: props.task.assignedUser
    })

    const handleUpdate = (field) => {
      return (e) => setState({...state, [field]: e.currentTarget.value});
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      props.updateTask(state.projectId, state);
      props.closeModal();
    }

    return (
      <div className='task-form-container'>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className='task-form-desc'
              type="text" 
              placeholder="Describe your task"
              value={state.description}
              onChange={handleUpdate('description')}
            />
          </label>
          <input 
            className='task-form-submit'
            disabled={ (state.description.length === 0) ? true : false}
            type="submit" 
            value="Update"/>
            <button onClick={props.closeModal}>Cancel</button>
        </form>
      </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
      // projectId: ownProps.match.params.projectId
    }
}

const mapDispatchToProps = dispatch => ({
  updateTask: (projectId, task) => dispatch(updateTask(projectId, task)),
  closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTaskForm);