// Write your "actions" router here!
const express = require("express");
const Actions = require("./actions-model");
const router = express.Router();

router.get("/", (req, res, next) => {
  Actions.get(req.query)
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch(next);
});

module.exports = router;
