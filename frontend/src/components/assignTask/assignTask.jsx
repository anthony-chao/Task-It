import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllTasks } from '../../actions/taskActions';
import { fetchUsers } from '../../actions/userActions'
import Autocomplete from '@mui/lab/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const AssignTask = (props) => {

    const [input, setInput] = useState({
        email: "",
        task: ""
    })

    useEffect(() => {
        props.fetchUsers();
        props.fetchAllTasks();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        let selectedUser = props.allUsers.map((object) => [object._id, object.email]).filter((arr) => arr[1] === input.email);
        let userId = selectedUser[0][0];
        let selectedTask = props.allTasks.map((object) => [object._id, object.description]).filter((arr) => arr[1] === input.task);
        let taskId = selectedTask[0][0];
        console.log(userId, taskId)
        // props.assignTask(input);           // WE NEED AN ACTION FOR ASSIGNING TASK
    }

    const handleUpdate = (field) => {
        return (e) => {
            setInput({...input, [field]: e.currentTarget.textContent})
        }
    }

    return (
        <div>
            {props.allTasks && props.allUsers ? 
            <form onSubmit={handleSubmit}>
                <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    id="free-solo-demo"
                    freeSolo
                    options={props.allUsers.map((option) => option.email)}
                    onChange={handleUpdate('email')}
                    renderInput={(params) => <TextField {...params} label="Enter a user's email" />}
                />
                <Autocomplete
                    id="free-solo-demo-2"
                    freeSolo
                    options={props.allTasks.map((option) => option.description)}
                    onChange={handleUpdate('task')}
                    renderInput={(params) => <TextField {...params} label="Enter a task name" />}
                />
                </Stack>
                <input type="submit" value="Assign Task" id="assign-task-button"/>
            </form>
            : null}
        </div>
    )

}

const mapStateToProps = state => {
    debugger
    return {
    allUsers: (state.entities.users.allUsers) ? Object.values(state.entities.users.allUsers) : null,
    allTasks: Object.values(state.entities.tasks)
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
    fetchAllTasks: () => dispatch(fetchAllTasks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignTask)