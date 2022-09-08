import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/branches-logo.jpeg';
import { logout } from '../../actions/sessionActions';
import { openModal } from '../../actions/modalActions';
import PermanentDrawer from '../permanentDrawer/PermanentDrawer';
import { FaUserCircle } from 'react-icons/fa';
import Modal from '../modal/Modal';

// class NavBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.logoutUser = this.logoutUser.bind(this);
//     this.getLinks = this.getLinks.bind(this);
//   }

//   logoutUser(e) {
//       e.preventDefault();
//       this.props.logout();
//   }

//   getLinks() {
//       if (this.props.loggedIn) {
//         return (
//             <div>
//                 <button onClick={this.logoutUser}>Logout</button>
//             </div>
//         );
//       } else {
//         return (
//             <div>
//                 <Link to={'/signup'}>Signup</Link>
//                 <Link to={'/login'}>Login</Link>
//             </div>
//         );
//       }
//   }

//   render() {
//       return (
//         <div>
//             <h1>Branches</h1>
//             { this.getLinks() }
//         </div>
//       );
//   }
// }


const NavBar = (props) => {

const { loggedIn, logout, openModal } = props;
  
 const openLoginModal = () => {
    return e => {
      e.preventDefault();
      openModal('login');
    }
  };

  const loginButton = () => {
   return (
    <div className="session-button">
      <FaUserCircle 
        id="user-icon"
        onClick={openLoginModal('login')} 
        style={{ color: 'lightgray'}} 
        size={50} />
    </div>
   )
  }

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
            <h1>Task Nodes</h1>
          </div>
        </Link>

      </div>

      <div className="nav-right">
        <div className="projects-button">
          { loggedIn ? <PermanentDrawer /> : null }
        </div>

        <Modal />
        {
          loggedIn ? logoutButton() : loginButton()
        }
      </div>
    </header>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.session.isAuthenticated
  }
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: formType => dispatch(openModal(formType)),
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

