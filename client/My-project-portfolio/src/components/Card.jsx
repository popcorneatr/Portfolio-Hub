import React from 'react'
import "./styles/Card.css"

function Card({project}) {
  return (
    <div className='card-container'>
        <h1 className='card-name'>Project Name: {project.projectName}</h1>
        <h2 className='card-owner'>Project Owner: {project.projectOwner}</h2>
        <p className='card-link'>GitHub Link: <a href={project.github} target="_blank" rel="noopener noreferrer">{project.github}</a></p>
        <p className='card-completed'>Completed: {project.completed ? "Yes" : "No"}</p>
        <p className='card-deployed'>Deployed: {project.deployed ? "Yes" : "No"}</p>
        {project.deployed === true ? <a href={project.websiteLink} target="_blank" rel="noopener noreferrer">Website Link</a> : ""}
    </div>
  )
}

export default Card