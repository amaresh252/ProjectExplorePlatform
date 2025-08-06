import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import dayjs from "dayjs";
import ProjectModal from "./ProjectModal";
import AddProjectModal from "./AddProjectModal";

export const Home = () => {

  const [projects, setProjects] = useState([]);
  const [allprojects, setAllProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState();
  const [userName, setUserName] = useState('');
   const navigate=useNavigate()
  const [selectedProject, setSelectedProject] = useState({});
  function handleProject(project,e){
    setSelectedProject(project)
    setShowModal(true)
  }

   async function fetchData() {
        const token = localStorage.getItem("token");
      const response = await fetch("https://project-explore-platform.vercel.app/api/projects", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        console.log(response);
        const error = await response.json();
        setErrors("Error in fetch All Project");
      } else {
        const data = await response.json();
        setProjects(data.result);
        setAllProjects(data.result)
        console.log(data);
      }
    }

function handleLogout(){
localStorage.removeItem('token')
localStorage.removeItem('name')
localStorage.removeItem('email')
localStorage.removeItem('role')
localStorage.removeItem('bio')
navigate('/')
}
 
  useEffect(() => {

     if(!localStorage.getItem('token')){
      navigate('/')
     }
    fetchData();
    setUserName(localStorage.getItem('name'))
  }, []);

  function onCreateProject() {
    setShow(true);
  }

  function handleCreate(flag) {
    setShow(false)
    fetchData()
  }

 function handleFilter(e){
  e.preventDefault()
   const search=e.target.value
   if(!search.trim()){
    setProjects(allprojects)
   }else{
    setProjects(allprojects.filter((project)=>project?.title===search||project.user.name===search))
   }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 px-4">
        <div className="container-fluid">
          {/* Logo and Brand */}
          <a
            className="navbar-brand d-flex align-items-center fw-bold fs-4"
            href="#"
          >
            ProjectHub
          </a>

          {/* Nav Links */}
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav gap-3 align-items-center">
              <li className="nav-item">
                <Link className="btn btn-secondary text-white" to="/home">
                  <i className="bi bi-house-door-fill me-1"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-secondary text-white" to="/profile">
                  <i className="bi bi-house-door-fill me-1"></i> Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Search and User */}
          <div className="d-flex align-items-center gap-3">
            <div
              className="input-group bg-dark rounded"
              style={{ maxWidth: "250px" }}
            >
              <input
                type="text"
                onChange={(e)=>handleFilter(e)}
                className="form-control bg-secondary text-white border-0"
                placeholder="Search"
                aria-label="Search"
              />
              <span className="input-group-text bg-secondary border-0 text-white">
                <i className="bi bi-search"></i>
              </span>
            </div>
            <div className="d-flex align-items-center">
              <span className="text-white">{userName}</span>
              <button onClick={handleLogout} className="btn btn-dark">Logout</button>
            </div>
          </div>
        </div>
      </nav>
      <section className="hero-section d-flex align-items-center text-white bg-dark py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Share Your Creative Projects
              </h1>
              <p className="lead mb-4">
                Connect with other creators, showcase your work, and get
                valuable feedback from the community.
              </p>
              <div className="d-flex gap-3">
                <button
                  onClick={onCreateProject}
                  className="btn btn-light text-dark"
                >
                  Create Project
                </button>
                
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Creative collaboration illustration"
                className="img-fluid rounded shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-light">
        <div className="container">
          {/* Section Heading */}
          <div className="mb-4">
            <h2 className="h3 fw-bold mb-1">Featured Projects</h2>
            <p className="text-muted">
              Discover amazing work from our community
            </p>
          </div>

          {/* Loading Placeholder */}
          {projects.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted mb-3">
                No projects found. Be the first to share your work!
              </p>
              
            </div>
          ) : (
            <div className="row g-4">
              {projects.length > 0 &&
                projects.map((project) => (
                  <div className="col-md-6 col-lg-4" key={project._id}>
                    <div className="col">
                      <div className="card">
                        <img
                          src={project.image_url}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="card-body">
                          <h5 className="card-title">{project.title}</h5>
                          <p className="card-text">{project.description}</p>
                          <div className="d-flex align-item-center justify-content-between">
                            <button onClick={(e)=>handleProject(project,e)} className="btn btn-dark">
                              View Project
                            </button>
                            <p>
                              {dayjs(project.createdAt).format("MMM D, YYYY")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
      <ProjectModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        project={selectedProject}
      />
      <AddProjectModal
        show={show}
        handleClose={() => setShow(false)}
        handleCreate={() => handleCreate(false)}
      />
    </div>
  );
};
