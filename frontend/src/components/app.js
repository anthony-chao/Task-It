import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/routeUtil";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./nav/nav";
import SplashContainer from "./splash/splash";
import HomeContainer from "./home/Home";
import AssignTaskContainer from "./assignTask/assignTask";
import TaskListContainer from "./task/taskList";
import Chat from "./chat/chat";
import ProjectsIndexContainer from "./project/ProjectsIndex";
import PermanentDrawer from "./permanentDrawer/PermanentDrawer";

const App = () => (
  <>
    <NavBarContainer />
    <ProtectedRoute path="/" component={PermanentDrawer} />
    <ProtectedRoute path="/" component={Chat} />
    <Switch>
      <ProtectedRoute
        path="/projects/:projectId"
        component={TaskListContainer}
      />
      <ProtectedRoute path="/tasks" component={TaskListContainer} />
      <ProtectedRoute path="/projects" component={ProjectsIndexContainer} />
      <ProtectedRoute path="/assigntask" component={AssignTaskContainer} />
      <ProtectedRoute exact path="/home" component={HomeContainer} />
      <AuthRoute exact path="/" component={SplashContainer} />
    </Switch>
  </>
);

export default App;
