const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Project = require('../../models/Project');
const validateProjectInput = require('../../validation/project');

router.get("/test", (req, res) => res.json({ msg: "This is the projects route" }));


router.get('/user/:user_id', (req, res) => {          // Backend - only the current user should have access to this route on the front end.
    Project.find({user: req.params.user_id})
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

// router.post('/', (req, res) => {
//       const { errors, isValid } = validateProjectInput(req.body);
  
//       if (!isValid) {
//         return res.status(400).json(errors);
//       }
  
//       const newProject = new Project({
//         name: req.body.name,
//         ownerId: req.user.id,
//         description: req.user.description
//       });
  
//       newProject.save().then(project => res.json(project));
//     }
//   );

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
        description: req.user.description
      });
  
      newProject.save().then(project => res.json(project));
    }
  );

module.exports = router;