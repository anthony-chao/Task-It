const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

const db = require('./config/keys').mongoURI;

const users = require("./routes/api/users");
const projects = require("./routes/api/projects")
const tasks = require("./routes/api/tasks");

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// app.get("/", (req, res) => res.send("Hello World!"));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/projects", projects);
app.use("/api/tasks", tasks);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));