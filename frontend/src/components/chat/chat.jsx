import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { TbSend } from "react-icons/tb";
import { socket } from "../../util/socketUtil";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
// import { FontAwesomeIcon } from '@fortawesome/fontawesome-free';
// import { faCommentAlt, faMinus } from '@fortawesome/fontawesome-free'
// import TextField from '@mui/material/TextField';
// import InputAdornment from '@mui/material/InputAdornment';
// import AccountCircle from '@mui/icons-material/AccountCircle';

const Chat = ({ currentUserFirstName, currentUserLastName }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [toggledChat, setToggledChat] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    socket.on("message", (payload) => {
      setChat([...chat, payload]);
    });
  });

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { userName, message });
    // Send message on socket
    setMessage("");
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const userName = currentUserFirstName + " " + currentUserLastName;
  const currentDate = new Date();
  const timestamp = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const chatBox = () => {
    return (
      <main className="opened-chat-container">
        <div
          className="close-chat"
          onClick={() => setToggledChat(!toggledChat)}
        >
          &times;
        </div>
        <form onSubmit={sendMessage} className="chat-footer">
          <input
            className="chat-input"
            type="text"
            name="message"
            value={message}
            placeholder="Chat here"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            required
          />
          <button type="submit">
            <TbSend size={25} />
          </button>
        </form>

        <div className="chat-box">
          {chat.map((payload, index) => {
            return (
              <>
                <p
                  className="chat-message"
                  key={"chat" - `${Math.floor(Math.random() * 10)}`}
                  ref={chatEndRef}
                >
                  {payload.userName}: {payload.message}
                  <span className="chat-timestamp">{timestamp}</span>
                </p>
              </>
            );
          })}
        </div>
      </main>
    );
  };

  const noChatBox = () => {
    return (
      <div
        className="closed-chat-container"
        onClick={() => setToggledChat(!toggledChat)}
      >
        <BsFillChatSquareQuoteFill className="chat-icon" size={70} />
      </div>
    );
  };

  return <>{toggledChat ? chatBox() : noChatBox()}</>;
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.session.isAuthenticated,
    currentUserFirstName: state.session.user.firstName,
    currentUserLastName: state.session.user.lastName,
  };
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
