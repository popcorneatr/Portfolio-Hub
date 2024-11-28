const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ProjectModel = require("./models/Projects");
const UserModel = require("./models/User");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const dbUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;
const PORT = process.env.PORT || 3001;

mongoose.connect(dbUrl);

// JWT Verification Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(403).send("Invalid token");
  }
};

//Get all projects public
app.get("/getProjects", async (req, res) => {
  try {
    const data = await ProjectModel.find({});
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//get user project (private)
app.get("/user/projects", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const userProjects = await ProjectModel.find({
      projectOwner: userId,
    }).populate("projectOwner", "username");

    res.json(userProjects);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).send("Server error");
  }
});

// Create a project (only for logged-in users)
app.post("/createProject", verifyToken, async (req, res) => {
  try {
    const project = {
      ...req.body,
      projectOwner: req.userId,
    };
    const newProject = new ProjectModel(project);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).send("Server error");
  }
});

//Delete a project
app.delete("/project/:id", verifyToken, async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.userId;

    // Check if the project belongs to the logged-in user
    const project = await ProjectModel.findOne({
      _id: projectId,
      projectOwner: userId,
    });
    if (!project) {
      return res.status(403).send("Unauthorized action");
    }

    await ProjectModel.deleteOne({ _id: projectId });
    res.status(200).send("Project deleted successfully");
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).send("Server error");
  }
});

// Register a user
app.post("/user", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      ...req.body,
      // Override the plain text password with hashed password
      password: hashedPassword,
    };
    const newProject = new UserModel(user);
    await newProject.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// User login
app.post("/user/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).send("Cannot find user");
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isValidPassword) {
      // Create a JWT token
      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "1h",
      });

      res.json({
        message: "Login successful",
        token,
        user: {
          _id: user._id,
          username: user.username,
        },
      });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("server error");
  }
});

// Public route to get projects by userId
app.get("/user/projects/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId, "username"); // Fetch only username
    if (!user) {
      return res.status(404).send("User not found");
    }
    const userProjects = await ProjectModel.find({
      projectOwner: userId,
    }).populate("projectOwner", "username");
    res.json({ username: user.username, projects: userProjects });
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log("Server is Running!");
});
