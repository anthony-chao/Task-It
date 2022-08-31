import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./components/root";
import configureStore from "./store/store";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "./util/sessionApiUtil";
import { login, logout } from "./actions/sessionActions";
import {
  fetchProjects,
  fetchProject,
  fetchUserProjects,
} from "./actions/projectActions";
import "./assets/stylesheets/main.scss";

document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } else {
    store = configureStore({});
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Root store={store} />);
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.fetchProjects = fetchProjects;
  window.fetchProject = fetchProject;
  window.fetchUserProjects = fetchUserProjects;
  window.login = login;
});
