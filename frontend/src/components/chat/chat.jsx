import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { TbSend } from "react-icons/tb";
import { socket } from "../../util/socketUtil";
import { BsFillChatSquareQuoteFill } from "react-icons/bs";
import { fetchMessages, createMessage } from "../../util/messageUtil";

const Chat = ({
  currentUserFirstName,
  currentUserLastName,
  fetchMessages,
  createMessage,
}) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [toggledChat, setToggledChat] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    const messageArray = [];
    fetchMessages().then((chatMessages) => {
      chatMessages.data.forEach((chatMessage) => {
        let allMessages = {};
        allMessages.message = chatMessage.message;
        allMessages.userName = chatMessage.userName;
        allMessages.date = chatMessage.date;
        messageArray.push(allMessages);
      });
      setChat(chat.concat(messageArray));
    });
  }, []);

  useEffect(() => {
    socket.on("chatMessage", (payload) => {
      setChat([...chat, payload]);
    });
  });

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const sendMessage = (e) => {
    e.preventDefault();
    createMessage({ message, userName, date: timestamp });
    // Send message on socket
    socket.emit("chatMessage", { userName, message, date: timestamp });
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
              setMessage(e.currentTarget.value);
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
              <p className="chat-message" ref={chatEndRef} key={index}>
                {payload.userName}: {payload.message}
                <span className="chat-timestamp">{payload.date}</span>
              </p>
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
        <BsFillChatSquareQuoteFill className="chat-icon" size={75} />
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
    fetchMessages: () => fetchMessages(),
    createMessage: (message) => createMessage(message),
  };
};

export default connect(mapStateToProps, null)(Chat);
