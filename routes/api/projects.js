const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Project = require("../../models/Project");
const Task = require("../../models/Task");
const User = require("../../models/User");
const validateProjectInput = require("../../validation/project");
const validateTaskInput = require("../../validation/task");

router.get("/test", (req, res) =>
  res.json({ msg: "This is the projects route" })
);

// GET ALL PROJECTS
router.get("/", (req, res) => {
  const payload = {};
  Project.find({})
    .then(projects => {
      payload.projects = projects;
      res.json(projects)
    })
});

// GET PROJECT BY PROJECT ID
router.get("/:id", (req, res) => {
  Project.findById(req.params.id)
      .then(project => res.json(project))
      .catch(err =>
          res.status(404).json({ noprojectfound: 'No project found with that ID' })
      );
});

// CREATE PROJECT
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateProjectInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }

    const newProject = new Project({
      name: req.body.name,
      ownerId: req.user.id,
      description: req.body.description,
    });

    newProject.save().then(
      User.findById(req.user.id).then((user) => {
        user.projects.push(newProject.id);
        user.save().then(res.json(newProject));
      })
    );
  }
);

// GET ALL OF THE CURRENT USER'S PROJECTS
router.get("/users/:user_id", (req, res) => {
  Project.find({ ownerId: req.params.user_id })
    .then((projects) => {
      const projectObj = {};
      projects.forEach((project) => {
        projectObj[project.id] = project;
      });
      res.json(projectObj);
    })
    .catch((err) =>
      res
        .status(404)
        .json({ noprojectsfound: "The user does not have any projects" })
    );
});

// UPDATE PROJECT

router.patch("/:id",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    const { errors, isValid } = validateProjectInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
    
  Project.findById(req.params.id).then((project) => {
    console.log(project);
    project.name = req.body.name;
    project.description = req.body.description;

    project
      .save()
      .then((project) => {
        console.log(project)
        res.json(project)})
      .catch((err) => console.log(err));
  });
});

// DELETE PROJECT BY ID
router.delete("/:id", (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(project => {
      Task.find({projectId: project.id})
        .then( tasks => {
          tasks.forEach( task => {
            Task.findByIdAndDelete(task.id)
              .then(() => {
                User.find({tasks: task.id})
                  .then( users => {
                    const updatedUsersTasks = users.map( user => {
                      user.tasks.pull(task.id)
                      user.save()
                    })
                  })
              })
          })
        })
      User.find({projects: project.id})
        .then(users => {
          const updatedUsers = users.map( user => {
            user.projects.pull(project.id)
            user.save()
          })
          res.json(updatedUsers)
        })
    });
});

// GET PROJECT'S TASKS
router.get("/:id/tasks", (req, res) => {
  Task.find({ projectId: req.params.id }).then((tasks) => res.json(tasks));
});

// CREATE TASK WITH PROJECT ID

router.post(
  "/:id/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTaskInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      projectId: req.params.id,
      status: req.body.status,
    });

    newTask.save().then((task) => {
      Project.findById(req.params.id).then((project) => {
        project.tasks.push(task.id);
        project.save().then(res.json(task));
      });
    });
  }
);

router.patch("/:projectId/tasks/:id", (req, res) => {
  Task.findById(req.params.id).then((task) => {
    // task.title = req.body.title;
    task.description = req.body.description;
    task.projectId = req.params.projectId;
    task.status = req.body.status;
    task.assignedUser = req.body.assignedUser;

    task.save().then((task) => res.json(task));
  });
});

module.exports = router;
