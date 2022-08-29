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
        ref: 'project'
    },
    status: {
        type: String,
        enum: ["Completed", "In Progress", "Invalid"]
    }
})

module.exports = Task = mongoose.model('task', TaskSchema)