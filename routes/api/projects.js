const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Project = require('../../models/Project');
const User = require('../../models/User');
const validateProjectInput = require('../../validation/project');
const validateTaskInput = require("../../validation/task");

router.get("/test", (req, res) => res.json({ msg: "This is the projects route" }));

router.get('/users/:user_id', (req, res) => {          // Hmmm how do we do find by the ownerId and by the members? because this should also get the projects for the members
    Project.find({ownerId: req.params.user_id})
        .then(projects => res.json(projects))
        .catch(err =>
            res.status(404).json({ noprojectsfound: 'The user does not have any projects' }
        )
    );
});

router.get('/:id', (req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err =>
            res.status(404).json({ noprojectfound: 'No project found with that ID' })
        );
});

router.patch('/:id/addMember', (req, res) => {
      // const { errors, isValid } = validateProjectInput(req.body);
  
      // if (!isValid) {
      //   return res.status(400).json(errors);
      // }
    Project.findById(req.params.id)
      .then(project => {
        User.findOne({email: req.body.email})
          .then( user => { 
            project.members.push(user.id)
            project.save()
            .then(res.json(project))
          })
          .catch(err => res.status(404).json({usernotfound: "No user found with this email"}))
      })
      
    }
);

router.patch('/:id/deleteMember', (req, res) => {
  // const { errors, isValid } = validateProjectInput(req.body);

  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }

    Project.findById(req.params.id)
      .then( project => {
        User.findOne({email: req.body.email})
          .then( user => { 
            project.members.pull(user.id)
            project.save()
            .then(res.json(project))
          })
          .catch(err => res.status(404).json({usernotfound: "No user found with this email"}))
      })

});

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
        description: req.body.description
      });
  
      newProject.save().then(project => res.json(project));
    }
  );

  router.post('/:id/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const { errors, isValid } = validateTaskInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        projectId: req.params.id,
        status: req.body.status
      });
  
      newTask.save().then(task => {
          Project.findById(req.params.id)
            .then(project => {
              project.tasks.push(task.id)
              project.save()
              .then(res.json(task))
            })

        });
    }
);

module.exports = router;