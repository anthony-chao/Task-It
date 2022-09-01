const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Project = require('../../models/Project');
const Task = require('../../models/Task');
const User = require('../../models/User');
const validateProjectInput = require('../../validation/project');
const validateTaskInput = require("../../validation/task");

router.get("/test", (req, res) => res.json({ msg: "This is the projects route" }));

// GET ALL PROJECTS

router.get('/', (req, res) => {
  Project.find({})
    .then(projects => res.json(projects))
})


// GET PROJECT BY PROJECT ID
router.get('/:id', (req, res) => {
  // Project.findById(req.params.id)
  //     .then(project => res.json(project))
  //     .catch(err =>
  //         res.status(404).json({ noprojectfound: 'No project found with that ID' })
  //     );
  Project.findById(req.params.id)
    .then(project => {
      const payload = {};
      payload.projects = project;
      Task.find({projectId : req.params.id})
        .then( tasks => {
          payload.tasks = tasks;
          res.json(payload) 
        })
    })
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
        description: req.body.description
      });
  
      newProject.save().then(project => res.json(project));
    }
  );

// GET ALL OF THE CURRENT USER'S PROJECTS
router.get('/users/:user_id', (req, res) => {
    Project.find({ownerId: req.params.user_id})
        .then(projects => {
          const projectObj = {};
          projects.forEach(project => {
            projectObj[project.id] = project
          });
          res.json(projectObj)
        })
        .catch(err =>
            res.status(404).json({ noprojectsfound: 'The user does not have any projects' }
        )
    );
});

// UPDATE PROJECT

router.patch('/:id', (req, res) => {
  Project.findById(req.params.id)
    .then( project => {
      project.name = req.body.name;
      project.description = req.body.description;
      // project.members = req.body.members;
      // project.tasks = req.body.tasks;

      project.save()
        .then(project => res.json(project))
        .catch(err => console.log(err))
    })
})

// DELETE PROJECT BY ID
router.delete('/:id', (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(project => res.json(project.id))
})


// router.patch('/:id/addMember', (req, res) => {
//       // const { errors, isValid } = validateProjectInput(req.body);
  
//       // if (!isValid) {
//       //   return res.status(400).json(errors);
//       // }
//     Project.findById(req.params.id)
//       .then(project => {
//         User.findOne({email: req.body.email})
//           .then( user => { 
//             project.members.push(user.id)
//             project.save()
//             .then(res.json(project))
//           })
//           .catch(err => res.status(404).json({usernotfound: "No user found with this email"}))
//       })
      
//     }
// );

// router.patch('/:id/deleteMember', (req, res) => {
//   // const { errors, isValid } = validateProjectInput(req.body);

//   // if (!isValid) {
//   //   return res.status(400).json(errors);
//   // }

//     Project.findById(req.params.id)
//       .then( project => {
//         User.findOne({email: req.body.email})
//           .then( user => { 
//             project.members.pull(user.id)
//             project.save()
//             .then(res.json(project))
//           })
//           .catch(err => res.status(404).json({usernotfound: "No user found with this email"}))
//       })

// });

// GET PROJECT'S TASKS
router.get("/:id/tasks", (req, res) => {
  // Project.findById(req.params.id)
  //   .then( project => {
  //     const projectTasks = {};
  //     Promise.all(
  //       project.tasks.map( task => {
  //         Task.findById(task)
  //           .then(searchedTask => {
  //             return searchedTask
  //           })
  //         }))
  //       .then(tasks => {
  //         tasks.forEach(task => {
  //           console.log(task)
  //           projectTasks[task._id] = task
  //         })
  //         res.json(projectTasks)
  //       })
  //   })
  //   .catch(err => console.log(err))
  Task.find({projectId: req.params.id})
    .then(tasks => res.json(tasks))
})

// GET PROJECT'S TASK ID

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

router.patch("/:projectId/tasks/:id", (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      task.title = req.body.title;
      task.description = req.body.description;
      task.projectId = req.params.projectId;
      task.status = req.body.status;

      task.save()
        .then( task => res.json(task))
    })
})

module.exports = router;