import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../home/Home";

const Splash = ({ currentUser, login, history }) => {
  const splashContent = () => {
    return (
      <>
        <div className="splash-container">
          <p>Welcome to Task-It..</p>
          <p>..to continue, please login..</p>
        </div>
        <div className="splash-frame"></div>
        <div className="splash-stage">
          <div className="splash-box">
            <div className="splash-in splash-one">
              <h3>Task-it</h3>
              <p>
                Task-it is an easy-to-use, intuitive project management tool
                that allows users to plan, organize and track their projects and
                tasks in one place.
              </p>
            </div>
          </div>
          <div className="splash-box">
            <div className="splash-in splash-two">
              <h3>Projects and Tasks</h3>
              <p>
                Create projects and tasks. Make your life easier by breaking
                down your projects into manageable pieces and mark tasks off as
                you go.
              </p>
            </div>
          </div>
          <div className="splash-box">
            <div className="splash-in splash-three">
              <h3>Assign Tasks</h3>
              <p>
                Be proactive. Keep everyone organized by delegating open tasks
                to yourself and other team members.
              </p>
            </div>
          </div>
          <div className="splash-box">
            <div className="splash-in splash-four">
              <h3>Live Chat</h3>
              <p>
                Start chatting. Bring your team together by communicating with
                your team members through our live chat functionality!
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const homeContent = () => {
    return <Home />;
  };

  return currentUser ? homeContent() : splashContent();
};

const msp = (state) => {
  return {
    currentUser: state.session.currentUser,
  };
};

export default withRouter(connect(msp)(Splash));
