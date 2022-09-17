import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/images/branches-logo.jpeg";
import { logout } from "../../actions/sessionActions";
import { openModal } from "../../actions/modalActions";
import PermanentDrawer from "../permanentDrawer/PermanentDrawer";
import { FaUserCircle } from "react-icons/fa";
import Modal from "../modal/Modal";

const Nav = (props) => {
  const { loggedIn, logout, openModal } = props;

  const openLoginModal = () => {
    return (e) => {
      e.preventDefault();
      openModal({ type: "login" });
    };
  };

  const loginButton = () => {
    return (
      <div className="session-button">
        <FaUserCircle
          id="user-icon"
          onClick={openLoginModal("login")}
          style={{ color: "lightgray" }}
          size={50}
        />
      </div>
    );
  };

  const logoutButton = () => {
    return (
      <div className="logout-button" onClick={logout}>
        Logout
      </div>
    );
  };

  return (
    <header className="nav-header-container">
      <div className="nav-left">
        <Link to="/">
          <div className="branches-logo-container">
            <img id="branches-logo" src={logo} alt="branches-logo" />
            <p>Branches</p>
          </div>
        </Link>
      </div>

      <div className="nav-right">
        {/* <div className="projects-button">
          { loggedIn ? <PermanentDrawer /> : null }
        </div> */}

        <Modal />
        {loggedIn ? logoutButton() : loginButton()}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.session.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (formType) => dispatch(openModal(formType)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
