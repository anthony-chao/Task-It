const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Project = require("../../models/Project");

const Task = require("../../models/Task");
const validateTaskInput = require("../../validation/task");

router.get("/test", (req, res) => res.json({ msg: "This is the tasks route" }));

router.get("/", (req, res) => {
    // Task.find({})
    Project.findById({id: req.params.id})
      .then( tasks => res.json(tasks))
      .catch(err => console.log(err))
  })

router.get("/:projectId", (req, res) => {
  Project.findById(req.params.projectId)
    .then( project => {
      console.log(project)
      Task.find({projectId: project.id})
        .then( tasks => res.json(tasks))
    })
})
// CREATE A TASK
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateTaskInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newTask = new Task({
        description: req.body.description,
        projectId: req.body.projectId,
        status: req.body.status
      });
  
      newTask.save().then(task => res.json(task));
    }
);



module.exports = router;