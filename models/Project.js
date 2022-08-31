const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'users',
        default: []
    }],
    description: {
        type: String,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'tasks',
        default: []
    }]
})

module.exports = Project = mongoose.model('projects', ProjectSchema)