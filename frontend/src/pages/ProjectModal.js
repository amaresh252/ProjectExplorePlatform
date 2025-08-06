import React, { useEffect, useState } from "react";
import { Modal, Button, Badge } from "react-bootstrap";

function ProjectModal({ show, handleClose, project }) {
  const [comments, setComments] = useState(project?.comments || []);
  const [newComment, setNewComment] = useState("");

  async function addComment(comment) {
        const token = localStorage.getItem("token");
      const response = await fetch(`https://project-explore-platform.vercel.app/api/projects/comment/${project._id}`, {
        method:'PUT',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:JSON.stringify({comment})
      });
      if (!response.ok) {
        console.log(response);
        const error = await response.json();
       
      } else {
        const data = await response.json();
        console.log(data);
         setComments([comment, ...comments]);
         setNewComment("");
      }
    }

  const handlePostComment = () => {
    if (newComment.trim() === "") return;

    addComment(newComment)
   
  };
  useEffect(() => {
  if (project?.comments) {
    setComments(project.comments);
  }
}, [project]);

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton className="border-0 pb-0" />
     {project&& <Modal.Body className="p-4 pt-0">
        <div className="row">
          {/* Left side: Project details */}
          <div className="col-lg-8">
            <h3 className="mb-3">{project?.title}</h3>

            <img
              src={project?.image_url}
              alt={project?.title}
              className="img-fluid rounded mb-4"
            />

            <h5>Project Description</h5>
            <p>{project?.description}</p>

            <h6 className="mt-4">Project Links</h6>
            <div className="d-flex gap-2 mb-4">
              <Button
                variant="outline-dark"
                href={project?.live_url}
                target="_blank"
              >
                <i className="bi bi-box-arrow-up-right me-1"></i> Live Demo
              </Button>
              <Button
                variant="outline-dark"
                href={project?.code_url}
                target="_blank"
              >
                <i className="bi bi-github me-1"></i> Source Code
              </Button>
            </div>

            {/* Comments Section */}
            <h6>Comments <Badge bg="secondary">{comments?.length}</Badge></h6>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Leave your feedback..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <div className="text-end mt-2">
                <Button variant="dark" size="sm" onClick={handlePostComment}>
                  Post Comment
                </Button>
              </div>
            </div>

            {/* Display Comments */}
            {comments?.length > 0 && (
              <ul className="list-group">
                {comments?.map((comment,index) => (
                  <li className="list-group-item" key={index}>
                    {comment}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right side: Author details */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="card p-4 text-center">
             
              <h5 className="mb-1">{project?.user?.name}</h5>
              <p className="text-muted mb-2">{project?.user?.role}</p>
              <p>{project?.user?.bio}</p>
        
            </div>
          </div>
        </div>
      </Modal.Body>
}
    </Modal>
  );
}

export default ProjectModal;
