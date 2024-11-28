import React, { useState, useEffect } from 'react';
import Axios from "axios";
import Card from "../../components/Card.jsx";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Home.css";

function SharedHome() {
    // Get userId from the URL
  const { userId } = useParams();
  const localhost = "http://localhost:3001";
  const render = "https://portfolio-hub-eapv.onrender.com";
  const [listOfProjects, setListOfProjects] = useState([]);
  const [username, setUsername] = useState('');

  const fetchSharedProjects = async () => {
    try {
      const response = await Axios.get(`${localhost}/user/projects/${userId}`);
      setListOfProjects(response.data.projects);
      setUsername(response.data.username);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSharedProjects();
  }, [userId]);

  return (
    <div className='home-container'>
      <header className="home-header">
        <h1>Projects of User {username}</h1>
      </header>

      <div className='project-display'>
        {listOfProjects.length > 0 ? (
          listOfProjects.map((project) => (
            <Card project={project} key={project._id} />
          ))
        ) : (
          <p className="no-projects">No projects found to display.</p>
        )}
      </div>
    </div>
  );
}

export default SharedHome;
