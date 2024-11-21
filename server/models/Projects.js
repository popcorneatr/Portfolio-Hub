const mongoose = require("mongoose")
const { Schema } = mongoose;

const ProjectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },

    projectOwner: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },

    linkedUsers: [
        {
          type: Schema.Types.ObjectId, 
          ref: "users",
        },
      ],

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