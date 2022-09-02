import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/routeUtil";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./NavBar/NavBar";
import SplashContainer from "./splash/splash";
import DashboardContainer from "./dashboard/Dashboard";

const App = () => (
  <>
    <NavBarContainer />
    <Switch>
      <ProtectedRoute exact path="/dashboard" component={DashboardContainer} />
      <AuthRoute exact path="/" component={SplashContainer} />
    </Switch>
  </>
);

export default App;
