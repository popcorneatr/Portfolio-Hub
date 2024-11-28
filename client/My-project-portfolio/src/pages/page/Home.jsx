import React, { useState, useEffect, useContext } from 'react';
import Axios from "axios";
import Card from "../../components/Card.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { FiPlus } from "react-icons/fi";


function Home() {

  const localhost = "http://localhost:3001";
  const render = "https://portfolio-hub-eapv.onrender.com";
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user
  const userId = user?._id;
  const [listOfProjects, setListOfProjects] = useState([]);


  const fetchApi = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await Axios.get(`${localhost}/user/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setListOfProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (projectId) => {
    setListOfProjects((prevProjects) =>
      prevProjects.filter((project) => project._id !== projectId)
    );
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    // Clear projects
    setListOfProjects([]);
    // Redirect to the landing page
    navigate("/");
  };

  const handleShare = () => {
    if (userId) {
      const shareableLink = `http://localhost:5173/shared/${userId}`;
      // Try to copy the link to clipboard
      navigator.clipboard.writeText(shareableLink)
        .then(() => {
          alert("Link copied to clipboard! Share it with others.");
        })
        .catch((err) => {
          console.error("Error copying link: ", err);
          alert("Failed to copy link.");
        });
    } else {
      alert("You need to be logged in to share your projects.");
    }
  };

  useEffect(() => {
    fetchApi();

  }, []);

  return (
    <div className='home-container'>
      <header className="home-header">
        <h1>My Projects</h1>
        <div className="header-buttons">
          {window.location.pathname === "/home" && (
            <button className="add-project-btn" onClick={() => navigate("/add-new-project")}>
              <FiPlus size={20} />
              <span>Add New Project</span>
            </button>
          )}

          <button onClick={handleShare} className="share-button">
            Share My Projects
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>
      </header>

      <div className='project-display'>
        {listOfProjects.length > 0 ? (
          listOfProjects.map((project) => (
            <Card project={project} key={project._id} onDelete={handleDelete}/>
          ))
        ) : (
          <p className="no-projects">No projects found. Click the button above to add a new project.</p>
        )}
      </div>
    </div>
  );
}

export default Home;


