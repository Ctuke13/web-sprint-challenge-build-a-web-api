// add middlewares here related to actions
const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

async function checkActionId(req, res, next) {
  try {
    const { id } = req.params;
    const action = await Actions.get(id);
    if (action) {
      req.action = action;
      next();
    } else {
      next({ status: 404, message: `Action ${id} not found` });
    }
  } catch (err) {
    next(err);
  }
}

async function checkAction(req, res, next) {
  const { project_id, description, notes, completed } = req.body;

  if (!project_id || typeof project_id !== "number") {
    return res
      .status(400)
      .json({ message: "The project id is required and must be a number." });
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.length > 128
  ) {
    return res.status(400).json({
      message: "The description is required and character limit 128.",
    });
  }

  if (!notes || typeof notes !== "string") {
    return res
      .status(400)
      .json({ message: "The notes are required and should be a string." });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ message: "The completed status should be a boolean." });
  }

  try {
    //Check if project exists
    const project = await Projects.get(project_id);
    if (!project) {
      return res.status(404).json({
        message: "The project_id must correspond to an existing project.",
      });
    }

    req.action = {
      project_id,
      description,
      notes,
      completed: completed ?? false,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkActionId,
  checkAction,
};
