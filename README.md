# Task-It

<p align="center">
  <img src="/frontend/src/assets/images/task-it-logo.png" alt="task-it-logo">
</p>

## Background and Overview

Task-It is a project management application where users can create projects and tasks for themselves or team members, as well as visualize the completion status of said project. Additionally, users will be able to utilize a live chat where they can communicate with other team members. This app provides you the opportunity to get and stay organized with others!

## Technologies Used
* Task-It was built using a MongoDB NoSQL database, Express web application framework, React-Redux frontend, and Node.js backend.
* Additionally, we utilized Socket.io for the live-chat functionality.
* We also used Axios for API calls, Rechart.js for the progress chart, and Material UI for autocomplete functionality.

## Functionality and MVP

### User Authentication
* Users will be able to sign up and create a new account, as well as log in to existing accounts (also accessible via demo login). Only logged in users will be able to use the functionality of the app.

### PLACEHOLDER FOR GIF OF CREATING A NEW USER OR SIGN IN

### Projects
* Users are able to view all projects in the project drawer. Upon clicking on a project, the user will be redirected to a project show page that details all the project's tasks.
* Users are able to add, edit and delete existing projects.

<img width="800" src="/frontend/src/assets/images/create-project.gif" alt="">

### Tasks
* Users can view all of the tasks related to a project, as well as add, edit and delete projects.
* Users will also have the ability to mark a task as complete or incomplete, which will update the project's completeness status.

<img width="800" src="/frontend/src/assets/images/create-task.gif" alt="">

### Live Chat
* Project team members are able to use a live chat functionality to discuss issues, status updates or anything with their team members.
* Users will be able to see who sent the message and a timestamp showing exactly when the message was sent.

### Assign Tasks
* Users will have the ability to assign tasks that are not completed to anyone in the app. Upon assigning a task, the user who the task is assigned to will be able to see the task in their tasks show page.

<img width="800" src="/frontend/src/assets/images/assign-task-live-chat.gif" alt="">

## Code Snippets 

Below is a code snippet of the Chat.jsx Component for the live chat implementation. There are two challenges that we encountered during development. First was enabling the chat messages to persist in the chat history once a user is re-logged-in. We resolved this issue by saving the messages in the database and mapping them to the chat box when the component renders. Second was rendering the chat time-stamps in real time. The solution to this was creating a Date object that keeps track of the current time and saving the message in the database with it in the date field. 
```
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
```

## Team
* [Patricia Andrea de Guzman](https://github.com/pa-dg)
* [Andy Liu](https://github.com/andyliu1527)
* [Michael Ng Cen](https://github.com/MichaelNgCen)
* [Anthony Chao](https://github.com/anthony-chao)