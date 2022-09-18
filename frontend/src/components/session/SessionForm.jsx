import React, { useState, useEffect } from 'react';

const SessionForm = props => {

  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    return () => {
      props.clearReceiveErrors();
    };
  }, []);

  const update = field => {
    // console.log(userInfo);
  return e => setUserInfo({
    ...userInfo, [field]: e.currentTarget.value 
    });
  };

  const closeModal = (e) => {
    e.preventDefault();
    props.closeModal();
  };  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = Object.assign({}, userInfo);
    props.processForm(user).then(response => {
      if (!response.errors) {
        props.login(user)
      }
    })
  };

  const demoLogin = (e) => {
    e.preventDefault();
    let email = 'demouser@branches.com';
    let password = 'password'
    const user = {
      email,
      password
    }

    const emailcb = () => {
      setTimeout(() => {
        if (email.length > 0) {
          setUserInfo({...userInfo, email: userInfo.email + email[0]})
          // console.log(email[0])
          // console.log(email.slice(1))
          // console.log(temp)
          console.log(userInfo)
          // console.log(userInfo.email.concat(email[0]))
          email = email.slice(1);
          emailcb();
        } else {
          console.log("--------")
          passwordcb();
        }
      }, 100);
    }
    const passwordcb = () => {
      setTimeout(() => {
        if (password.length > 0) {
          setUserInfo({...userInfo, password: userInfo.password.concat(password[0])})
          console.log(password[0])
          console.log(userInfo.password)
          password = password.slice(1);
          passwordcb();
        } else {
          setTimeout(() => {
            props.processForm(user).then(closeModal());
          }, 500);
        }
      }, 100)
    }
    props.clearReceiveErrors();
    emailcb();
  }

  const { formType, otherForm } = props;

  return (
    <>
      <div className="session-form-header">
        <div className="exit-modal" onClick={closeModal}>&times;</div>
        <div className='modalImg'><img id='splashLogo' src='https://i.ibb.co/zRxzj9T/logo-For-Andrea.png' alt='splashLogo'></img> </div>
        <h1>Welcome to Branches!</h1>
      </div>

      <form onSubmit={handleSubmit} className="login-signup-form">
          {
            props.formType === 'Sign Up' && (
              <>
                <label htmlFor="modal-fname">
                  <input 
                    className={props.errors.firstName ? "fname-with-error" : ""}
                    type="text"
                    placeholder="First Name"
                    value={userInfo.firstName}
                    onChange={update('firstName')}
                  />
                  {(props.errors.firstName) ? <p className="session-error">{props.errors.firstName} </p> : null}
                </label>
                <label htmlFor="modal-lname">
                  <input type="text" 
                    className={props.errors.lastName ? "lname-with-error" : ""}
                    placeholder="Last Name"
                    value={userInfo.lastName}
                    onChange={update('lastName')}
                  />
                  {(props.errors.lastName) ? <p className="session-error">{props.errors.lastName} </p> : null}
                </label>  
              </>
            )
          }
          <label htmlFor="modal-email">
            <input
              className={props.errors.email ? "email-with-error" : ""}
              type="email"
              placeholder="Email"
              value={userInfo.email} 
              onChange={update('email')}
            />
            {(props.errors.email) ? <p className="session-error">{props.errors.email}</p> : null}
          </label>  
          <label htmlFor="modal-password">
            <input 
              className={props.errors.password ? "password-with-error" : ""}
              type="password" 
              placeholder="Password"
              value={userInfo.password}
              onChange={update('password')}
            />
            {(props.errors.password) ? <p className="session-error">{props.errors.password}</p> : null}
          </label>
            <button value={formType} className="session-button">{formType}</button>
            { (props.formType === "Log In") ?
            <button value="Demo Login" className="demo-login-button" onClick={demoLogin}>Demo Login</button>
            : null }
      </form>
      <footer className="session-form-footer">
        {otherForm}
      </footer>
    </>
  );
}

export default SessionForm;