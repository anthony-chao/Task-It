import React from 'react';
import TaskItem from './taskItem';

class TaskList extends React.Component {

    render() {
        return (
            <ul>
                {/* { this.props.tasks.map((task) => {
                    <TaskItem key={task.id} task={task} deleteTask={this.props.deleteTask} updateTask={this.props.updateTask}/>
                })} */}
            </ul>
        )
    }

}

export default TaskList;