import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!username.trim()) {
      errors.username = "Username is required";
    }
    if (!role.trim()) {
      errors.username = "Role is required";
    }
    if (!bio.trim()) {
      errors.username = "Bio is required";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }
    if (!name.trim()) {
      errors.password = "Name is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const response = await fetch("https://project-explore-platform.vercel.app/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, username, password,role,bio }),
      headers: { "content-type": "application/json" },
    });
    if (!response.ok) {
      console.log(response);
      errors.login = await response.json();
      setErrors(errors);
    } else {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("name", data.result.name);
      localStorage.setItem("email", data.result.email);
      localStorage.setItem("role", data.result.role);
      localStorage.setItem("bio", data.result.bio);
      localStorage.setItem("id", data.result._id);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
  };

  return (
    <div>
      <div className="container  my-5 border" style={{ padding: "0" }}>
        <div className="bg-warning">Register Page</div>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <form onSubmit={handleRegister}>
              <div className="row mb-4">
                <div className="col-md-3">
                  <label htmlFor="username">Name</label>
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control "
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {errors.name && <p className="text-danger">{errors.name}</p>}
                </div>
              </div>
              <div className="row ">
                <div className="col-md-3">
                  <label htmlFor="username">Email</label>
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control "
                    type="email"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username && (
                    <p className="text-danger">{errors.username}</p>
                  )}
                </div>
              </div>
               <div className="row ">
                <div className="col-md-3">
                  <label htmlFor="role">Role</label>
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control "
                    type="role"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                  {errors.role && (
                    <p className="text-danger">{errors.role}</p>
                  )}
                </div>
              </div>
               <div className="row ">
                <div className="col-md-3">
                  <label htmlFor="bio">Bio</label>
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control "
                    type="bio"
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  {errors.bio && (
                    <p className="text-danger">{errors.bio}</p>
                  )}
                </div>
              </div>
              <div className="row mt-4 mb-2">
                <div className="col-md-3">
                  <label htmlFor="password">Password</label>
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control "
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password}</p>
                  )}
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                  <button className="btn btn-primary w-100">Register</button>
                  {errors.login && (
                    <p className="text-danger">{errors.login}</p>
                  )}
                </div>
              </div>
              <div className="row mb-4 align-center">
                <div className="col">
                  If You Have Account :{" "}
                  <span className="text-primary">
                    <Link
                      className="text-primary text-decoration-none"
                      to={`/`}
                    >
                      Login
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
