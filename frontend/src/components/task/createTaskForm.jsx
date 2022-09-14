import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../actions/taskActions';

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
      e.preventDefault()
      props.createTask(props.projectId, state)
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
            type="submit" 
            text="Submit"/>
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
  createTask: (projectId, task) => dispatch(createTask(projectId, task))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm);