import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { TbSend } from 'react-icons/tb';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';


const socket = io('http://localhost:3000');
// const userName = 'User ' + parseInt(Math.random()*10)

const Chat = ({ currentUserFirstName, currentUserLastName }) => {

  const userName = (currentUserFirstName + " " + currentUserLastName);

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const chatEndRef = useRef(null);
  
  useEffect(() => {
    socket.on('message', payload => {
      setChat([...chat, payload])
    })
  })

  useEffect(() => {
    scrollToBottom()
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();
    // console.log(message)
    socket.emit('message', {userName, message})
    // Send message on socket
    setMessage('')
  }

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView( {behavior: "smooth"} )
  }

  const currentDate = new Date();
  const timestamp = currentDate.toLocaleTimeString();
  console.log(`${timestamp}`)
  // console.log(`${timestamp}`);
  
  return (

    <main className="chat-container">
      <form onSubmit={sendMessage} className="chat-footer">
          <input className="chat-input"
            type="text" 
            name="message" 
            value={message}
            placeholder="Chat here"
            onChange={(e) => {setMessage(e.target.value)}}
            required
          />
          <button type='submit'>
            <TbSend size={30}/>
          </button>
      </form>

    {/* <form onSubmit={sendMessage}>
      <TextField
        id="input-with-icon-textfield"
        label={userName}
        value={message}
        onChange={(e) => {setMessage(e.target.value)}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <button type='submit'>
            <TbSend size={30}/>
      </button>
    </form> */}

      <div className="chat-box">
        {chat.map((payload, index) => {
          return (
            <>
              <p className="chat-message" key={index} ref={chatEndRef}>
                {payload.userName}: <span>{payload.message}</span>
                <p className="chat-timestamp">{timestamp}</p>
              </p>
            </>
          )
        })}
      </div>
    </main>
  )
};

const mapStateToProps = state => {
  return {
    loggedIn: state.session.isAuthenticated,
    currentUserFirstName: state.session.user.firstName,
    currentUserLastName: state.session.user.lastName,
  }
};

const mapDispatchToProps = dispatch => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);