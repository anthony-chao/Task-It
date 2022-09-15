const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Message = require("../../models/Message")

router.get("/test", (req, res) => res.json({msg: "This is the message route" }));

router.get("/", (req, res) => {
  Message.find({})
    .then( messages => res.json(messages))
})

router.post("/", (req, res) => {
  const newMessage = new Message ({
    message: req.body.message,
    user: req.body.user,
  })

  newMessage.save().then(res.json(newMessage));
})

module.exports = router;