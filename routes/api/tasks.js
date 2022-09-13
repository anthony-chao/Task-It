const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Project = require("../../models/Project");

const Task = require("../../models/Task");
const User = require("../../models/User");
const validateTaskInput = require("../../validation/task");

router.get("/test", (req, res) => res.json({ msg: "This is the tasks route" }));

// GET ALL TASKS
router.get("/", (req, res) => {
  Task.find({})
    .then( tasks => res.json(tasks))
  })

// GET TASKS BY ID
router.get("/:id", (req, res) => {
  Task.findById(req.params.id)
    .then( tasks => res.json(tasks))
})

// GET TASKS BY PROJECT ID
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
        assignedUser: req.body.assignedUser,
        status: req.body.status
      });
  
      newTask.save().then(task => res.json(task));
    }
);
// EDIT A TASK
router.patch("/:id", (req,res) => {
  Task.findById(req.params.id)
    .then( task => {
      task.description = req.body.description;
      task.status = req.body.status;

      task.save()
        .then(task => res.json(task))
    })
})

// ASSIGN USER TO TASK
router.patch("/:id", (req, res) => {
  Task.findById(req.params.id)
    .then( task => {
      task.assignedUser.push(req.body.assignedUser)
      //assigned user in the body should be user id?
      task.save()
        .then( 
          User.findById(req.body.assignedUser)
          .then( user => {
            user.tasks.push(task.id)
            user.save()
              .then(res.json(task))
          })
        )
    })
})

// DELETE A TASK
router.delete("/:id", (req,res) => {
  Task.findByIdAndDelete(req.params.id)
    .then(task => res.json(task.id))
})

// GET ALL TASKS FOR USER

router.get("/user/:userId", (req,res) => {
  Task.find({assignedUser: req.params.id})
    .then(tasks => res.json(tasks))
})

module.exports = router;