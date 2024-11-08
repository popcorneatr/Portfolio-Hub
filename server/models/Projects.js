const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },

    projectOwner: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        required: true
    },

    deployed: {
        type: Boolean,
        required: true
    },

    websiteLink: {
        type: String,
        required: false
    },

    github: {
        type: String,
        required: false
    }

})

const ProjectModel = mongoose.model("projects", ProjectSchema)
module.exports = ProjectModel