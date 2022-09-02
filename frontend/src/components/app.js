import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/routeUtil";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./navbar/navbar";
import SplashContainer from "./splash/splash";
import DashboardContainer from "./dashboard/Dashboard";

const App = () => (
  <div className="main-container">
    <NavBarContainer />
    <ProtectedRoute path="/dashboard" component={DashboardContainer} />
    <Switch>
      <AuthRoute exact path="/" component={SplashContainer} />
    </Switch>
  </div>
);

export default App;
