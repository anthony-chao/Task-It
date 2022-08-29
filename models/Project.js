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
        ref: 'users'
    }],
    description: {
        type: String,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'tasks'
    }]
})

module.exports = Project = mongoose.model('projects', ProjectSchema)