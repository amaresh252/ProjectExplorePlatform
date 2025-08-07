import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");

  async function fetchData() {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const response = await fetch(
      `https://project-explore-platform.vercel.app/api/projects/user/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      console.log(response);
      const error = await response.json();
    } else {
      const data = await response.json();
      setProjects(data.result);
      console.log(data);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    fetchData();

    setUserName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setRole(localStorage.getItem("role"));
    setBio(localStorage.getItem("bio"));
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 px-4">
        <div className="container-fluid">
          <h1 className="navbar-brand d-flex align-items-center fw-bold fs-4">
            ProjectHub
          </h1>

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

          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center">
              <span className="text-white">{userName}</span>
            </div>
          </div>
        </div>
      </nav>
      <Container fluid className="bg-light min-vh-100 py-4">
        <Row className="justify-content-center">
          <Col md={3}>
            <div className="border border-1 text-center">
              <h3>
                <b>Name: </b>
                {userName}
              </h3>
              <h6>
                <b>Email: </b>
                {email}
              </h6>
              <h6>
                <b>Role: </b>
                {role}
              </h6>
              <h6>
                <b>Bio: </b>
                {bio}
              </h6>
            </div>
          </Col>

          <Col md={8}>
            {projects.map((project) => (
              <Card key={project._id} className="mb-4 shadow-sm border-0">
                <Row className="g-0">
                  <Col md={4}>
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="img-fluid rounded-start"
                    />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title className="fw-bold">
                        {project.title}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        {project.description}
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
