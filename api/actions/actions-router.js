// Write your "actions" router here!
const express = require("express");
const { checkActionId, checkAction } = require("./actions-middleware");
const Actions = require("./actions-model");
const router = express.Router();

router.get("/:id?", checkActionId, (req, res, next) => {
  res.json(req.action);
});

router.post("/", checkAction, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch(next);
});

router.delete("/:id", checkActionId, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: `Action ${req.params.id} has been deleted.`,
      });
    })
    .catch(next);
});

router.put("/:id", checkActionId, checkAction, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    customMessage: "Error occured inside the actions router",
  });
});

module.exports = router;
