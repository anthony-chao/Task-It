import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchAllTasks, fetchAllUsers } from '../../actions/taskActions';
import Autocomplete from '@mui/lab/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const AssignTask = (props) => {

    const [state, setState] = useState({        // do we need this? if i setstate, it doesn't work
        allUsers: props.allUsers,
        allTasks: props.allTasks
    })

    const [input, setInput] = useState({
        email: "",
        task: ""
    })

    useEffect(() => {
        props.fetchAllUsers();
        props.fetchAllTasks();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // props.assignTask(input);           // WE NEED AN ACTION FOR ASSIGNING TASK
    }

    const handleUpdate = (field) => {
        return (e) => {
            setInput({...input, [field]: e.currentTarget.value})
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
                    onChange={handleUpdate('description')}
                    renderInput={(params) => <TextField {...params} label="Enter a task name" />}
                />
                </Stack>
                <input type="submit" value="Assign Task"/>
            </form>
            : null}
        </div>
    )

}

const mapStateToProps = state => ({
    allUsers: Object.values(state.entities.users)[0],
    allTasks: Object.values(state.entities.tasks)[0]
})

const mapDispatchToProps = dispatch => ({
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchAllTasks: () => dispatch(fetchAllTasks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AssignTask)