// Write your "projects" router here!
const express = require("express");
const { checkProject, checkProjectId } = require("./projects-middleware");
const Projects = require("./projects-model");
const router = express.Router();

router.get("/:id?", checkProjectId, (req, res, next) => {
  res.json(req.project);
});

router.post("/", checkProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch(next);
});

router.delete("/:id", checkProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: `Project ${req.params.id} has been deleted.`,
      });
    })
    .catch(next);
});

router.put("/:id", checkProjectId, checkProject, (req, res, next) => {
  const { completed } = req.body;
  if (!completed && typeof completed !== "boolean") {
    res.status(400).json({
      message: "No completed boolean",
    });
  } else {
    Projects.update(req.params.id, req.body)
      .then((project) => {
        res.status(200).json(project);
      })
      .catch(next);
  }
});

router.get("/:id/actions", checkProjectId, async (req, res, next) => {
  try {
    const result = await Projects.getProjectActions(req.params.id);
    res.json(result);
  } catch {
    next(err);
  }
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Error occured inside the actions router",
  });
});

module.exports = router;
