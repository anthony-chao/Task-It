import React from 'react';

class TaskItem extends React.Component {

    constructor(props) {
        super(props)

        this.state = props.task

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    handleUpdate() {
        this.props.updateTask(this.props.task.id)
    }

    handleDelete() {
        this.props.deleteTask(this.props.task.id)
    }

    render() {
        return (
            <li>
                <div>{this.props.task.title}</div>
                <div>{this.props.task.description}</div>
                <input type="checkbox" 
                    checked={(this.props.task.status === "Incomplete") ? true : false}
                    onClick= {(this.props.task.status === "Incomplete") ? this.setState({status: "Completed"}) : this.setState({status: "Incomplete"})}
                />
                <button onClick={this.handleDelete}></button>
            </li>
        )
    }

}

export default TaskItem;