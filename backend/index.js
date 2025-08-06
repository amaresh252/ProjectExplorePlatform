const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const authRoutes = require("./routes/Auth");
const projectRoutes = require("./routes/Project");
const { connectDatabase } = require("./database");

connectDatabase();

const server = express();
// Middleware
server.use(cors());
server.use(express.static("public"));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// Routes
server.get("/", (req, res) => {
  res.send("Server is ready");
});
server.use(express.static(path.resolve(__dirname,'build')))
server.use("/api/auth", authRoutes);
server.use("/api/projects", projectRoutes);

// Start server
server.listen(process.env.PORT, () => {
  console.log("🚀 Server running");
});
