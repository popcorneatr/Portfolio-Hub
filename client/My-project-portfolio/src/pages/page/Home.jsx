import React, { useState, useEffect } from 'react';
import Axios from "axios";
import Card from "../../components/Card.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { FiPlus } from "react-icons/fi";

function Home() {
  const navigate = useNavigate();
  const [listOfProjects, setListOfProjects] = useState([]);

  const fetchApi = async () => {
    try {
      const response = await Axios.get("http://localhost:3001/getProjects");
      setListOfProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className='home-container'>
      <header className="home-header">
        <h1>My Projects</h1>
        <button className="add-project-btn" onClick={() => navigate("/add-new-project")}>
          <FiPlus size={20} />
          <span>Add New Project</span>
        </button>
      </header>
      <div className='project-display'>
        {listOfProjects.length > 0 ? (
          listOfProjects.map((project) => (
            <Card project={project} key={project._id} />
          ))
        ) : (
          <p className="no-projects">No projects found. Click the button above to add a new project.</p>
        )}
      </div>
    </div>
  );
}

export default Home;


