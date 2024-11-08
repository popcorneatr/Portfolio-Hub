import React from 'react';
import './styles/ProjectForm.css'

function ProjectForm({ project, handleChange, createProject }) {
  return (
    <div className='project-form-container'>
      <h2>Add a New Project</h2>
      <form className="project-form">
        <div className="form-group">
          <label htmlFor="projectName">Project Name*</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            placeholder="Enter project name"
            value={project.projectName}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="projectOwner">Project Owner*</label>
          <input
            type="text"
            id="projectOwner"
            name="projectOwner"
            placeholder="Enter project owner"
            value={project.projectOwner}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="github">GitHub URL</label>
          <input
            type="text"
            id="github"
            name="github"
            placeholder="Enter GitHub URL"
            value={project.github}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="websiteLink">Website URL</label>
          <input
            type="text"
            id="websiteLink"
            name="websiteLink"
            placeholder="Enter Website URL"
            value={project.websiteLink}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="completed">Completed*</label>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={project.completed}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="deployed">Deployed*</label>
          <input
            type="checkbox"
            id="deployed"
            name="deployed"
            checked={project.deployed}
            onChange={handleChange}
          />
        </div>

        <button type="button" className="submit-button" onClick={createProject}>
          Create Project
        </button>
      </form>
    </div>
  );
}

export default ProjectForm;
