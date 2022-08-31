const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    projectId : {
        type: Schema.Types.ObjectId,
        ref: 'project',
        required: true
    },
    status: {
        type: String,
        enum: ["Completed", "In Progress", "Invalid"],
        required: true
    },
    subtasks: [{
        type: Schema.Types.ObjectId,
        ref: 'TaskSchema'
    }]
})

module.exports = Task = mongoose.model('tasks', TaskSchema)