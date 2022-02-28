import React, { useState, useEffect } from "react";
import io from "socket.io-client";
// import "./App.css";

let socket;
const CONNECTION_PORT = "localhost:3002/";


function Chat() {
  // Before Login
  
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  // After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  
  let name1
  name1 = ""



  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const sendMessage = async () => {
    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };
    if(messageContent['content']['message'] === './guesser'){
      socket.emit("send_message", messageContent);
        messageContent['content']['message'] = '+++++ Guessing game initiated +++++';
      setMessageList([...messageList, messageContent.content]);
      setMessage("");
    }else if(messageContent['content']['message'] !== ''){
        console.log('sending msg ' + messageContent['content']['message'] );
      socket.emit("send_message", messageContent);
      setMessageList([...messageList, messageContent.content]);
      setMessage("");}
};

  return (
    <div className="App">
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input
              type="text"
              placeholder="Your Name"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room Name"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button type="submit" onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
          <div className="messages">
            {messageList.map((val, key) => {
              return (
                <div
                  className="messageContainer"
                  id={val.author === userName ? "You" : "Other"}
                  // id={val.author == userName ? "You" : "Other"}
                >
                  <div className="messageIndividual">
                    <div><span className="user_name">{name1 = val.author === userName ? "You" :val.author }</span></div>
                    <div>{val.message}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="messageInputs">
            <input
              type="text"
              placeholder="Message..."
              onChange={(e) => {
                setMessage(e.target.value);
              }} onKeyPress={event => {
                if (event.key === 'Enter') {
                  sendMessage()
                }
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
