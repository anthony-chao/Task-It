import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');
const userName = 'User ' + parseInt(Math.random()*10)

const Chat = ({ currentUserFirstName, currentUserLastName }) => {

  // const userName = {currentUserFirstName} + {currentUserLastName}

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('message', payload => {
      setChat([...chat, payload])
    })
  })
  
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(message)
    socket.emit('message', {userName, message})
    // Send message on socket
    setMessage('')
  }
  
  return (

    <main className="chat-container">
      <form onSubmit={sendMessage}>
        <input 
          type="text" 
          name="message" 
          value={message}
          placeholder="Type message here"
          onChange={(e) => {setMessage(e.target.value)}}
          required
        />
        <button type='submit'>Send</button>
      </form>
      {chat.map((payload, index) => {
        return (
          <h3 key={index}>
            {payload.userName}: <span>{payload.message}</span>
          </h3>
        )
      })}
    </main>
  )
};

const mapStateToProps = state => {
  return {
    loggedIn: state.session.isAuthenticated
    // currentUserFirstName: state.session.user.firstName
    // currentUserLastName: state.session.user.lastName
  }
};

const mapDispatchToProps = dispatch => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);