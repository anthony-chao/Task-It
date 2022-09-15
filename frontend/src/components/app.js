import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/routeUtil";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./nav/nav";
import SplashContainer from "./splash/splash";
import HomeContainer from "./home/Home";
import AssignTaskContainer from "./assignTask/assignTask";
import TaskListContainer from "./task/taskList";
import Chat from "./chat/chat";
import PermanentDrawer from "./permanentDrawer/PermanentDrawer";
import ProjectsIndexContainer from "./project/ProjectsIndex";

const App = () => (
  <div className="parent-container">
    <div className="main-container">
      <NavBarContainer />
      <ProtectedRoute exact path="/home" component={HomeContainer} />
      <Chat />
      <Switch>
        <ProtectedRoute path="/projects/:projectId" component={TaskListContainer} />
        <ProtectedRoute path="/tasks" component={TaskListContainer} />
        <ProtectedRoute path="/projects" component={ProjectsIndexContainer} />
        <ProtectedRoute path="/assigntask" component={AssignTaskContainer} />
        <AuthRoute exact path="/" component={SplashContainer} />
      </Switch>
    </div>

    <div className="side-drawer-container">
      <ProtectedRoute path="/" component={PermanentDrawer} />
    </div>
  </div>
);

export default App;
