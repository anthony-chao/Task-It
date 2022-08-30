import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/routeUtil";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./NavBar/NavBar";
// import MainPage from "./main/main_page";
import LoginFormContainer from "./session/loginFormContainer";
import SignupFormContainer from "./session/signupFormContainer";
import SplashContainer from "./splash/splash";

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      {/* <AuthRoute exact path="/" component={MainPage} /> */}
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <Route path="/" component={SplashContainer} />
    </Switch>
  </div>
);

export default App;
