import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../actions/taskActions';
import { closeModal } from '../../actions/modalActions';

const CreateTaskForm = (props) => {

    const [state, setState] = useState({
      description: '',
      status: 'Incomplete',
      projectId: props.projectId,
      assignedUser: []
    })

    const handleUpdate = (field) => {
      return (e) => setState({...state, [field]: e.currentTarget.value})
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      props.createTask(state);
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
            text="Submit"/>
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
  createTask: (task) => dispatch(createTask(task)),
  closeModal: () => dispatch(closeModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm);