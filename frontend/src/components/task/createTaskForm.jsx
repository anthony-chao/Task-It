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

    const [error, setError] = useState(false);

    const handleError = () => {
      if (state.description.length === 0) {
        setError(true);
        return true;
      }
      else {
        setError(false);
        return false;
      }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      
      let taskError = handleError();

      if (!taskError) {
        props.createTask(state);
        props.closeModal();
      }
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
          {(error) ? <p className="session-error">Task description cannot be empty!</p> : null}
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