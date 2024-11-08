const express = require("express")
const app = express()
const mongoose = require("mongoose")
const ProjectModel = require("./models/Projects")
const cors = require("cors")
require('dotenv').config();

app.use(express.json())
app.use(cors())

const dbUrl = process.env.DATABASE_URL;

mongoose.connect(dbUrl)

app.get("/getProjects", async (req, res) => {
 
    try {
        const data = await ProjectModel.find({})
        res.json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server error' });
    }
})

app.post("/createProject", async (req, res) => {
    const project = req.body
    const newProject = new ProjectModel(project)
    await newProject.save()
    res.json(project)
})


app.listen(3001, () => {
    console.log("Server is Running!")
})