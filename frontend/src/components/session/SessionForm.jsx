import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/images/task-it-logo.png";

const SessionForm = (props) => {
  const userInfoRef = useRef({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    return () => {
      props.clearReceiveErrors();
    };
  }, []);

  useEffect(() => {
    userInfoRef.current = userInfo;
  }, [userInfo]);

  const update = (field) => {
    return (e) =>
      setUserInfo({
        ...userInfo,
        [field]: e.currentTarget.value,
      });
  };

  const closeModal = (e) => {
    e.preventDefault();
    props.closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = Object.assign({}, userInfo);
    props.processForm(user).then((response) => {
      if (response !== undefined && !response.errors) {
        props.login(user);
      }
    });
  };

  const demoLogin = (e) => {
    e.preventDefault();
    let email = "demouser@task-it.com";
    let password = "password";
    setUserInfo({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    const emailcb = () => {
      setTimeout(() => {
        if (email.length > 0) {
          setUserInfo({
            ...userInfo,
            email: userInfoRef.current.email + email[0],
            password: userInfoRef.current.password,
          });
          email = email.slice(1);
          emailcb();
        } else {
          passwordcb();
        }
      }, 75);
    };
    const passwordcb = () => {
      setTimeout(() => {
        if (password.length > 0) {
          setUserInfo({
            ...userInfo,
            email: userInfoRef.current.email,
            password: userInfoRef.current.password + password[0],
          });
          password = password.slice(1);
          passwordcb();
        } else {
          setTimeout(() => {
            props.processForm(userInfoRef.current).then(props.closeModal());
          }, 500);
        }
      }, 75);
    };
    props.clearReceiveErrors();
    emailcb();
  };

  const { formType, otherForm } = props;

  return (
    <>
      <div className="session-form-header">
        <div className="exit-modal" onClick={closeModal}>
          &times;
        </div>
        <div className="modalImg">
          <img id="splashLogo" src={logo} alt="splashLogo"></img>{" "}
        </div>
        <h1>Welcome to Task-It!</h1>
      </div>

      <form onSubmit={handleSubmit} className="login-signup-form">
        {props.formType === "Sign Up" && (
          <>
            <label htmlFor="modal-fname">
              <input
                className={props.errors.firstName ? "fname-with-error" : ""}
                type="text"
                placeholder="First Name"
                value={userInfo.firstName}
                onChange={update("firstName")}
              />
              {props.errors.firstName ? (
                <p className="session-error">{props.errors.firstName} </p>
              ) : null}
            </label>
            <label htmlFor="modal-lname">
              <input
                type="text"
                className={props.errors.lastName ? "lname-with-error" : ""}
                placeholder="Last Name"
                value={userInfo.lastName}
                onChange={update("lastName")}
              />
              {props.errors.lastName ? (
                <p className="session-error">{props.errors.lastName} </p>
              ) : null}
            </label>
          </>
        )}
        <label htmlFor="modal-email">
          <input
            className={props.errors.email ? "email-with-error" : ""}
            type="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={update("email")}
          />
          {props.errors.email ? (
            <p className="session-error">{props.errors.email}</p>
          ) : null}
        </label>
        <label htmlFor="modal-password">
          <input
            className={props.errors.password ? "password-with-error" : ""}
            type="password"
            placeholder="Password"
            value={userInfo.password}
            onChange={update("password")}
          />
          {props.errors.password ? (
            <p className="session-error">{props.errors.password}</p>
          ) : null}
        </label>
        <button value={formType} className="session-button">
          {formType}
        </button>
        {props.formType === "Log In" ? (
          <button
            value="Demo Login"
            className="demo-login-button"
            onClick={demoLogin}
          >
            Demo Login
          </button>
        ) : null}
      </form>
      <footer className="session-form-footer">{otherForm}</footer>
    </>
  );
};

export default SessionForm;
