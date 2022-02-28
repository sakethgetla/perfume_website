import React, { useState, useEffect } from 'react';
import axios from "axios";
// import "./App.css";

function Chat() {
  const [msg, setMsg] = useState('');
  const [msgsList, setMsgsList] = useState([]);
    const [reset, setReset] = useState(false);
    const [time, setTime] = useState(Date.now());

  useEffect(() => {
    //console.log(msg);
    //setMsgs(c.data);
      rend();
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
	clearInterval(interval);
    };

  }, [msgsList]);


useEffect(() => {
  }, []);

    const handleInput = event => {
	console.log(event);
	postMsg(event);

        rend();
    };
    

    const rend = async () => {
        try {
	    await axios.get('http://localhost:8000/user/message').then( (c) => {
		console.log(typeof(c.data));
		console.log(c.data);
                if (msgsList[0] == null || msgsList[0]['message_id'] != c.data[0]['message_id']){
		    setMsgsList(c.data);
		    console.log('reload');
                } else {
		    console.log('not reload');
                }
		//setMsgs(c.data[0]);
	    }
	    );
        } catch (e) {
            console.error(e);
        }
        //return ( <div>{ms.map(m => <div>{m}</div>)}</div>);
        //return ( <div></div>);
    };

    rend();
    let renderMsgsList = msgsList?.map((message) => {
    const m = message.message;

    console.log(message.message);
    return (
        <div key={message.message_id}>
          {m}
        </div>
    );
  });

  return (
    <div>
      <p> chat </p>
      {renderMsgsList}
      <input onChange = {(event) => setMsg(event.target.value)}>
      </input>
      <button onClick={() => {handleInput(msg);
                              setReset(true);
                             }}>
        Click me
      </button>
    </div>
  );
}

const postMsg = async (msg) => {
        let body = {};
        body['message'] = msg;
        body['sender_user_id'] = 5;
        body['recipient_user_id'] = 6;
	await axios.post('http://localhost:8000/user/message', body).catch ((e) => {
            console.error(e);
        });
        //return ( <div>{ms.map(m => <div>{m}</div>)}</div>);
        //return ( <div></div>);
    };
 


const getMsgs = async () => {
    let c = await axios.get('http://localhost:8000/messages');
    console.log(getMsgs());
    return c;
};

const renderMsg = (msg) => {
    console.log(msg);
    
    return (
        <div>
          {msg['message']}
        </div>
    );
};


//import React from "react";
//
//class Chat extends React.Component {
//    constructor(props){
//        super(props);
//        this.state = {
//            message: ''
//        };
//    }
//
//    render() {
//        return (
//            <div>
//              <h3>
//                chat
//              </h3>
//
//              <form>
//                <input onChange = {() => this.handleInput}
//                       name="room"
//                       />
//                <button onClick = {() => this.handleClick}>
//                  New Room
//                </button>
//              </form>
//            </div>
//        );
//    }
//
//    handleInput = event => {
//	this.setState({message: event});
//            console.log(this.state);
//    };
//        handleClick(){
//            console.log('clicked');
//
//        }
//}
              //<form action="/room" method="POST">
                //<button value="submit">

//const Chat = () => {
//  return (
//    <div>
//      <h1>Chat</h1>
//      <div id="room-container">
//        {/* MAKE A REQUEST FOR ROOMS */}
//        {/* {Object.keys(rooms).forEach((room) => (
//          <>
//            <div>room</div>
//            <a href={`/room`}>Join</a>
//          </>
//        ))} */}
//      </div>
//    </div>
//  );
//};
      //<form action="/room" method="POST">
      //  <input name="room" type="text" required />
      //  <button type="submit">New Room</button>
      //</form>

//export default Chat;




//const connectToRoom = () =>{
//
//};
//
//const Chat = () =>{
//    const [room, setRoom] = useState("");
//    const [message, setMessage] = useState("");
//    const [messageList, setMessageList] = useState([]);
//    const [userName, setUserName] = useState("");
//    return (
//	<div className="logIn">
//          <div className="inputs">
//            <input
//              type="text"
//              placeholder="Your Name"
//              onChange={(e) => {
//                setUserName(e.target.value);
//              }}
//            />
//            <input
//              type="text"
//              placeholder="Room Name"
//              onChange={(e) => {
//                setRoom(e.target.value);
//              }}
//            />
//          </div>
//          <button type="submit" onClick={connectToRoom}>Enter Chat</button>
//        </div>
//    );
//};
//
//export default Chat;
