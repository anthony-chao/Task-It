import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/routeUtil";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./navbar/NavBar";
import SplashContainer from "./splash/splash";
import DashboardContainer from "./dashboard/Dashboard";
import TaskContainer from "./task/Task";

const App = () => (
  <div className="main-container">
    <NavBarContainer />
    <ProtectedRoute path="/dashboard" component={DashboardContainer} />
    <Switch>
      <ProtectedRoute
        exact
        path="/dashboard/projects/:projectId"
        component={TaskContainer}
      />
      <AuthRoute exact path="/" component={SplashContainer} />
    </Switch>
  </div>
);

export default App;
