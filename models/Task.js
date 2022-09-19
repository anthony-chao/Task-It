const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    assignedUser: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: []
    }],
    projectId : {
        type: Schema.Types.ObjectId,
        ref: 'project',
        required: true
    },
    status: {
        type: String,
        enum: ["Completed", "Incomplete"],
    }
    // subtasks: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'TaskSchema'
    // }]
})

module.exports = Task = mongoose.model('tasks', TaskSchema)