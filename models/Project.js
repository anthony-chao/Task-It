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
    membersId: [{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }],
    description: {
        type: String,
        required: true
    },
    rootTask: {
        type: Schema.Types.ObjectId,
        ref: 'task'
    }
})

module.exports = Project = mongoose.model('project', ProjectSchema)