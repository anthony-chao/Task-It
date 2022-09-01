import React, { Component } from 'react'
import CreateTaskForm from './createTaskForm'
import TaskList from './taskList'
import { connect } from 'react-redux'

class Task extends Component {

  render() {
    return (
      <div>
        <h1>Task List</h1>
        <CreateTaskForm createTask={this.props.createTask}/>
        <TaskList tasks={this.props.tasks} deleteTask={this.props.deleteTask} updateTask={this.props.updateTask}/>
      </div>
    )
  }

}

const mapStateToProps = state => ({
    // WE NEED STATE TO HAVE A PROJECT WITH AN ARRAY OF TASKS SO WE CAN MAP OVER THEM
})

const mapDispatchToProps = dispatch => ({
    // createTask: (task) => dispatch(createTask(task)),
    // deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    // updateTask: (taskId) => dispatch(updateTask(taskId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Task)