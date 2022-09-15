import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createTask } from '../../actions/taskActions';
import { closeModal } from '../../actions/modalActions';
import { clearReceiveErrors } from '../../actions/taskActions';

const CreateTaskForm = (props) => {

    const [state, setState] = useState({
      description: '',
      status: 'Incomplete',
      projectId: props.projectId,
      assignedUser: []
    })

    useEffect(() => {
      return () => {
        props.clearReceiveErrors();
      };
    }, []);

    const handleUpdate = (field) => {
      return (e) => setState({...state, [field]: e.currentTarget.value})
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      // props.createTask(state).then(console.log(state))
      // .catch(() => console.log("fail"));
      props.createTask(state).then((props.errors.description) ? () => props.closeModal() : null)
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
          <button onClick={props.closeModal}>Cancel</button>
          {(props.errors.description) ? <p className="session-error">{props.errors.description} </p> : null}
        </form>
      </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
      // projectId: ownProps.match.params.projectId
      errors: state.errors.task
    }
}

const mapDispatchToProps = dispatch => ({
  createTask: (task) => dispatch(createTask(task)),
  closeModal: () => dispatch(closeModal()),
  clearReceiveErrors: () => dispatch(clearReceiveErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm);