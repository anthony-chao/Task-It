import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/routeUtil";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./navbar/navbar";
import SplashContainer from "./splash/splash";
import HomeContainer from "./home/Home";
import AssignTaskContainer from './assignTask/assignTask';
import TaskListContainer from "./task/taskList";
import Chat from "./chat/chat";
import PermanentDrawer from "./permanentDrawer/PermanentDrawer";
import ProjectsIndexContainer from "./project/ProjectsIndex";

const App = () => (
  <div className="main-container">
    <NavBarContainer />
    <ProtectedRoute exact path="/home" component={HomeContainer} />
    <ProtectedRoute path="/" component={PermanentDrawer} />
    <Chat />
    <Switch>
      <ProtectedRoute
        path="/projects/:currentUserId"
        component={ProjectsIndexContainer}
      />
      <AuthRoute exact path="/" component={SplashContainer} />
    </Switch>
  </div>
);

export default App;
