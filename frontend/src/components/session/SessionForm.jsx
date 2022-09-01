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
    props.processForm(user)
  };

  const demoLogin = (e) => {
    e.preventDefault();
    props.processForm({
      email: 'demouser@branches.com',
      password: 'password',
    }
    const speed = 2;

    const interval = setInterval(() => {
      if (user.email !== '') {
        const temp = user.email.slice(0, user.email.length + 1);
        setUserInfo({ ...userInfo, email: temp });
      }
      else {
        clearInterval(interval);
        setUserInfo({ ...userInfo, email: 'demouser@branches.com' });
      }
    } , speed);
    const interval2 = setInterval(() => {
      if (user.password !== '') {
        user.password = user.password.slice(0, -1);
        setUserInfo({ ...userInfo, password: user.password });
      }
      else {
        clearInterval(interval2);
        setUserInfo({ ...userInfo, password: 'password' });
      }
    } , speed);
    props.processForm(user);
  }

  const { formType, otherForm } = props;

  return (
    <>
      <div className="session-form-header">
        <div className="exit-modal" onClick={closeModal}>&times;</div>
        <div className='modalImg'><img id='splashLogo' src='https://i.ibb.co/zRxzj9T/logo-For-Andrea.png' alt='splashLogo'></img> </div>
        <h1>Welcome to Task Nodes!</h1>
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
            {(props.errors.email) ? <p className="session-error">{props.errors.email} </p> : null}
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
            <button value="Demo Login" className="demo-login-button" onClick={demoLogin}>Demo Login</button>
      </form>
      <footer className="session-form-footer">
        {otherForm}
      </footer>
    </>
  );
}

export default SessionForm;