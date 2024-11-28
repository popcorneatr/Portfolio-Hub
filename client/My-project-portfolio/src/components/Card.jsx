import React from 'react';
import Axios from 'axios';
import "./styles/Card.css";

function Card({ project, onDelete }) {

  const localhost = "http://localhost:3001";
  const render = "https://portfolio-hub-eapv.onrender.com";
  const projectOwnerName = project.projectOwner?.username || "Unknown Owner";
 
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // If user is not logged in or there's no user object, return a fallback UI or disable the delete button
    const isOwner = user ? project.projectOwner._id === user._id : false;

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const token = localStorage.getItem("token");
        await Axios.delete(`${localhost}/project/${project._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Notify the parent to remove the card from the UI
        onDelete(project._id);
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  return (
    <div className='card-container'>
      {isOwner && <button className="delete-button" onClick={handleDelete}>&times;</button>}
      <h1 className='card-name'>Project Name: {project.projectName}</h1>
      <h2 className='card-owner'>Project Owner: {projectOwnerName}</h2>
      <p className='card-link'>
        GitHub Link:{" "}
        <a href={project.github} target="_blank" rel="noopener noreferrer">
          {project.github}
        </a>
      </p>
      <p className='card-completed'>Completed: {project.completed ? "Yes" : "No"}</p>
      <p className='card-deployed'>Deployed: {project.deployed ? "Yes" : "No"}</p>
      {project.deployed && (
        <a href={project.websiteLink} target="_blank" rel="noopener noreferrer">
          Website Link
        </a>
      )}
    </div>
  );
}

export default Card;

