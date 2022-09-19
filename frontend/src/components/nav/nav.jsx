import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/images/task-it-logo.png";
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
      <FaUserCircle
        id="user-icon"
        onClick={openLoginModal("login")}
        size={55}
      />
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
      {loggedIn ? <PermanentDrawer /> : null}
      <div className="nav-left">
        <Link to="/">
          <div className="task-it-logo-container">
            <img id="task-it-logo" src={logo} alt="task-it-logo" />
            {/* <p>Branches</p> */}
          </div>
        </Link>
      </div>

      <div className="nav-right">
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
