# Branches

![alt text](https://i.postimg.cc/9MBxgVG3/image-removebg-preview-2.png)

## Background and Overview

Branches is a project management application where users can create projects and tasks for themselves or team members, as well as visualize the completion status of said project. Additionally, users will be able to utilize a live chat where they can communicate with other team members. This app provides you the opportunity to get and stay organized with others!

## Technologies Used
* Branches was built using a MongoDB NoSQL database, Express web application framework, React-Redux frontend, and Node.js backend.
* Additionally, we utilized Socket.io for the live-chat functionality.

## Functionality and MVP

### User Authentication
* Users will be able to sign up and create a new account, as well as log in to existing accounts (also accessible via demo login). Only logged in usersw will be able to use the functionality of the app.

### PLACEHOLDER FOR GIF OF CREATING A NEW USER OR SIGN IN

### Projects
* Users are able to view all projects in the project drawer. Upon clicking on a project, the user will be redirected to a project show page that details all the project's tasks.
* Users are able to add, edit and delete existing projects.

### PLACEHOLDER FOR GIF OF ADDING PROJECT

### Tasks
* Users can view all of the tasks related to a project, as well as add, edit and delete projects.
* Users will also have the ability to mark a task as complete or incomplete, which will update the project's completeness status.

### PLACEHOLDER FOR GIF OF ADDING TASK


### Live Chat
* Project team members are able to use a live chat functionality to discuss issues, status updates or anything with their team members.
* Users will be able to see who sent the message and a timestamp showing exactly when the message was sent.

### PLACEHOLDER FOR GIF OF LIVE CHAT

### Assign Tasks
* Users will have the ability to assign tasks that are not completed to anyone in the app. Upon assigning a task, the user who the task is assigned to will be able to see the task in their tasks show page.


## Code Snippets 

Below is a code snippet of our implementation of Websocket for the live chat. The main difficulty with getting this set up was getting the time to render on the chat messages. We rendered the time through deconstructing the timestamp into an hour and minute, and then appending that time to each message.
```
 const userName = (currentUserFirstName + " " + currentUserLastName);
  const currentDate = new Date();
  const timestamp = currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  const chatBox = () => {
    return (
      <main className="opened-chat-container">
        <div className="close-chat" onClick={() => setToggledChat(!toggledChat)}>&times;</div>
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
              <TbSend size={30} />
            </button>
        </form>

       <div className="chat-box">
        {chat.map((payload, index) => {
          return (
            <>
              <p className="chat-message" key={index} ref={chatEndRef}>
                {payload.userName}: {payload.message}
                <span className="chat-timestamp">{timestamp}</span>
              </p>
            </>
          )
        })}
      </div>
    </main>
  )
};
```

## Team
* Patricia Andrea de Guzman
* Andy Liu
* Michael Ng Cen
* Anthony Chao