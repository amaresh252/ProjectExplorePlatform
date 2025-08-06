import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AddProjectModal({ show, handleClose,handleCreate }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    live_url: "",
    code_url: "",
    image_url: "",
  });
  const [errors,setErrors]=useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit =async () => {
    setErrors(null)
    if(!formData.title.trim()||!formData.description.trim()||!formData.live_url.trim()||!formData.code_url.trim()||!formData.image_url.trim()){
    setErrors('Please Fill All Field')
    return 
    }
    console.log(formData)
    const token=localStorage.getItem('token')
    console.log(token)
    const response = await fetch("http://localhost:8080/api/projects", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
    if (!response.ok) {
      console.log(response);
    const  error = await response.json();
    
      setErrors('Error in Creating Project');
    } else {
      const data = await response.json();
      console.log(data);
       handleCreate();
    }
  };
function handleHide(){
  setErrors(null)
  handleClose()
}
  return (
    <Modal show={show} onHide={handleHide} size="lg" centered scrollable>
      {/* Cross button */}
      <Modal.Header closeButton>
        <Modal.Title>Add New Project</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Project Title *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter a descriptive title for your project"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description *</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Describe your project, its goals, and key features"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Live Demo URL</Form.Label>
                <Form.Control
                  type="url"
                  name="live_url"
                  placeholder="https://your-project-demo.com"
                  value={formData.live_url}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Source Code URL</Form.Label>
                <Form.Control
                  type="url"
                  name="code_url"
                  placeholder="https://github.com/username/project"
                  value={formData.code_url}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Project Image URL</Form.Label>
            <Form.Control
              type="url"
              name="image_url"
              placeholder="https://example.com/your-image.jpg"
              value={formData.image_url}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      {/* Footer Buttons */}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleHide}>
          Cancel
        </Button>
        <Button variant="dark" onClick={onSubmit}>
          Create Project
        </Button>
        {errors &&<p>{errors}</p>}
      </Modal.Footer>
    </Modal>
  );
}

export default AddProjectModal;
