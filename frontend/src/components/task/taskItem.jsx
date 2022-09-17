import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateTask, deleteTask } from '../../actions/taskActions';
import { openModal, closeModal } from '../../actions/modalActions';

const TaskItem = (props) => {

    const {
        task,
        users,
        deleteTask,
        updateTask,
        openModal
      } = props;

    const [state, setState] = useState({
        _id: task._id,
        projectId: task.projectId,
        description: task.description,
        assignedUser: task.assignedUser,
        status: task.status,
        editing: false
    })

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            updateTask(state);
            setLoading(false);
        }
    }, [loading]);

    const handleToggle = () => {
        if (state.status === "Incomplete") {
            setState({...state, status: "Completed"});
            setLoading(true)
        }
        else {
            setState({...state, status: "Incomplete"});
            setLoading(true)
        }
    }

    const handleDelete = () => {
        openModal({
            type: 'deleteTask',
            task: state
        })
    }

    const handleUpdate = () => {
        openModal({
            type: 'updateTask',
            task: state
        })
    }

    const allUsers = () => {
        let array = [];

        if (task.assignedUser.length !== 0 && Object.values(users).length > 1) {
            for (let i = 0; i < task.assignedUser.length; i++) {
                array.push(users[task.assignedUser[i]].firstName.concat(" ", users[task.assignedUser[i]].lastName))
            }
            {return ([... new Set(array)].map(user => (
                <p className="task-assigned-user">{user}</p>
            )))}
        }
    }
    
    return (
            <li className="task-index-item" key={Math.random() * 10000}>
                <div className="task-item-no-buttons" id="task-item-no-buttons">
                    <div className="task-item-name">
                        <div className="task-item-counter">
                            <input type="checkbox" 
                                checked={(state.status === "Incomplete") ? false : true}
                                onChange= {handleToggle}
                                id="checkbox"
                            />
                            <p>Task #{props.index + 1}</p>
                        </div>
                            <div>{task.description}</div>
                    <div className="task-assigned-users">
                        <p className="task-text">Assigned Users:</p>
                        {((Object.values(users).length !== 0) && (task.assignedUser[0])) ? allUsers() : <p className="task-assigned-user">None</p>}
                    </div>
                    </div>
                <div className="project-action-buttons">
                    <button onClick={handleUpdate}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
                </div>
            </li>
    )
}

const mapDispatchToProps = dispatch => ({
    deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    updateTask: (task) => dispatch(updateTask(task)),
    openModal: (type) => dispatch(openModal(type))
})

export default connect(null, mapDispatchToProps)(TaskItem);