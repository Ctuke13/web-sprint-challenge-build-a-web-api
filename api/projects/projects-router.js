// Write your "projects" router here!
const express = require("express");
const { checkProject, checkProjectId } = require("./projects-middleware");
const Projects = require("./projects-model");
const router = express.Router();

router.get("/id?", checkProjectId, (req, res, next) => {
  res.json(req.action);
});

router.post("/", (req, res, next) => {});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Error occured inside the actions router",
  });
});

module.exports = router;
