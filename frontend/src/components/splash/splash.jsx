import React from 'react';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Dashboard from '../dashboard/Dashboard';

const Splash = ({ currentUser, login, history }) => {


  const splashContent = () => {

    return (
      <div className="splashContainer">

        {/* <nav className="splashNav">
        <Link to="/">
            <img id="splashLogo" src="https://i.ibb.co/hF4GNPW/newLogo.png" alt="spashLogo" />
          </Link>
          <Link to="/login">
            <img id="sLink" src="https://i.ibb.co/pJqjmSb/imageedit-3-5201840979.png" alt="splashLink" />
          </Link>
        </nav> */}

        <main id="splash">
          <div id="tagline">
            <h1 id="tagline-1">Branches1 is a project management tool that allows logged in users to deconstruct their projects into manageable tasks while also enabling them to visualize the completion status of the project.</h1>
          </div>
          <div id="tagline2">
            <h1 id="tagline-2">Branches2 is a project management tool that allows logged in users to deconstruct their projects into manageable tasks while also enabling them to visualize the completion status of the project.</h1>
          </div>
          <div id="tagline3">
            <h1 id="tagline-3">Branches3 is a project management tool that allows logged in users to deconstruct their projects into manageable tasks while also enabling them to visualize the completion status of the project.</h1>
          </div>
          <div id="tagline4">
            <h1 id="tagline-4">Branches4 is a project management tool that allows logged in users to deconstruct their projects into manageable tasks while also enabling them to visualize the completion status of the project.</h1>
          </div>
        </main>

        <footer id="splashFooter">
          <div id="memberList">
            <p id="memberTitle">TEAM</p>
            <ul id="member">
                <li id="gs" className="splash-link"><a href="https://www.linkedin.com/in/patricia-deguzman/" target="_blank">Patricia Andrea de Guzman</a></li>
                <li id="gs" className="splash-link"><a href="https://www.linkedin.com/in/anthony-chao-cpa-983299133/" target="_blank">Anthony Chao</a></li>
                <li id="gs" className="splash-link"><a href="https://www.linkedin.com/in/andy-liu-9b2a65159/" target="_blank">Andy Liu</a></li>
                <li id="gs" className="splash-link"><a href="https://www.linkedin.com/in/michaelngcen/" target="_blank">Michael Ng Cen</a></li>
            </ul>
          </div>

        </footer>
      </div>
    )
  }

  const dashboardContent = () => {
    return (
      <Dashboard />
    )
  };

  return currentUser ? dashboardContent() : splashContent();
};

const msp = state => {
    return {
        currentUser: state.session.currentUser
    };
    }

export default withRouter(connect(msp)(Splash));
