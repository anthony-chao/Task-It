import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/routeUtil";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./navbar/navbar";
import SplashContainer from "./splash/splash";
import DashboardContainer from "./dashboard/Dashboard";
// import TaskContainer from "./task/Task"

const App = () => (
  <>
    <NavBarContainer />
    <ProtectedRoute path="/dashboard" component={DashboardContainer} />
    <Switch>
      {/* <ProtectedRoute exact path="/dashboard/projects/:projectId" component={TaskContainer} /> */}
      <AuthRoute exact path="/" component={SplashContainer} />
    </Switch>
  </>
);

export default App;
