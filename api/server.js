const express = require("express");
const { actionsMid } = require("./actions/actions-middleware");
const { projectsMid } = require("./projects/projects-middleware");

const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
const actionsRouter = require("./actions/actions-router");

// Build your projects router in /api/projects/projects-router.js
const projectsRouter = require("./projects/projects-router");

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

server.use(express.json());
server.use(logger);
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});
// Do NOT `server.listen()` inside this file!

module.exports = server;
