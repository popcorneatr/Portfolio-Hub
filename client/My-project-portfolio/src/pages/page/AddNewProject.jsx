import React, { useState } from "react";
import Axios from "axios";
import ProjectForm from "../../components/ProjectForm.jsx";
import { useNavigate } from "react-router-dom";

function AddNewProject() {
  const navigate = useNavigate();
  const initialProjectState = {
    projectName: '',
    projectOwner: '',
    github: '',
    websiteLink: '',
    completed: false,
    deployed: false
  };
  
  const [project, setProject] = useState(initialProjectState);

  const createProject = async () => {
    try {
      await Axios.post("http://localhost:3001/createProject", project);
      // Clear the form fields
      setProject(initialProjectState);
      // Navigate back to the Home page after creation
      navigate("/");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject((prevProject) => ({
      ...prevProject,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div>
      <ProjectForm
        project={project}
        handleChange={handleChange}
        createProject={createProject}
      />
    </div>
  );
}

export default AddNewProject;
