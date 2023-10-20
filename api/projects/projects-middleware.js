// add middlewares here related to projects
// const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

async function checkProjectId(req, res, next) {
  try {
    const { id } = req.params;
    const project = await Projects.get(id);
    if (project) {
      req.project = project;
      next();
    } else {
      next({ status: 404, message: `project ${id} not found` });
    }
  } catch (err) {
    next(err);
  }
}

async function checkProject(req, res, next) {
  const { id, name, notes, completed } = req.body;

  if (!id || typeof id !== "number") {
    return res
      .status(400)
      .json({ message: "The project id is required and must be a number." });
  }

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      message: "The name is required",
    });
  }

  if (!description || typeof description !== "string") {
    return res.status(400).json({ message: "The description is required." });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ message: "The completed status should be a boolean." });
  }

  try {
    //Check if project exists
    const project = await Projects.get(id);
    if (!project) {
      return res.status(404).json({
        message: "The project_id must correspond to an existing project.",
      });
    }

    req.action = {
      id,
      description,
      name,
      completed: completed ?? false,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkProjectId,
  checkProject,
};
