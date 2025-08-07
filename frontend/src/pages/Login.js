import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!username.trim()) {
      errors.username = "Username is required";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const response = await fetch(
      "https://project-explore-platform.vercel.app/api/auth/login",
      {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "content-type": "application/json" },
      }
    );
    if (!response.ok) {
      console.log(response);
      errors.login = await response.json();
      setErrors(errors);
    } else {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("name", data.result.name);
      localStorage.setItem("role", data.result.role);
      localStorage.setItem("bio", data.result.bio);
      localStorage.setItem("email", data.result.email);
      localStorage.setItem("id", data.result._id);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <div>
      <div className="container  my-5 border" style={{ padding: "0" }}>
        <div className="bg-warning">Login Page</div>
        <div className="row justify-content-center">
          <div className="col-md-10">
            <form onSubmit={handleLogin}>
              <div className="row ">
                <div className="col-md-3">
                  <label htmlFor="username">Email</label>
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control "
                    placeholder="test@gmail.com"
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
              <div className="row mt-4 mb-2">
                <div className="col-md-3">
                  <label htmlFor="password">Password</label>
                </div>
                <div className="col-md-6">
                  <input
                    className="form-control "
                    type="password"
                    id="password"
                    placeholder="12345678"
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
                  <button className="btn btn-primary w-100">Login</button>
                  {errors.login && (
                    <p className="text-danger">{errors.login}</p>
                  )}
                </div>
              </div>
              <div className="row mb-4 align-center">
                <div className="col">
                  If You Don't Have Account :{" "}
                  <span className="text-primary">
                    <Link
                      className="text-primary text-decoration-none"
                      to={`/register`}
                    >
                      Register
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
