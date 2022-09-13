import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/routeUtil";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./navbar/navbar";
import SplashContainer from "./splash/splash";
import HomeContainer from "./home/Home";
import AssignTaskContainer from './assignTask/assignTask';
import TaskListContainer from "./task/taskList";
import Chat from "./chat/chat";

const App = () => (
  <div className="main-container">
    <NavBarContainer />
    <ProtectedRoute path="/home" component={HomeContainer} />
    <ProtectedRoute path="/projects/:projectId" component={TaskListContainer} />
    <ProtectedRoute path="/assigntask" component={AssignTaskContainer} />

    <Chat />
    <Switch>
      <AuthRoute exact path="/" component={SplashContainer} />
    </Switch>
  </div>
);

export default App;
