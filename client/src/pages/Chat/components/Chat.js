import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import '../App.css';
//import { useAuth, Logout } from "./../../../Auth";


//function Chat({sender, reciecer}) {
//function Chat({user, socket}) {
//    console.log(user, socket);
//    return(
//        <div>
//          vhat
//        </div>);
//}


function Chat({user_id, recipient_user_id, socket}) {
    const [msg, setMsg] = useState('');
    const [msgsList, setMsgsList] = useState([]);
    const [time, setTime] = useState(Date.now());

    const {id} = useParams();
    const their_user_id = recipient_user_id;
    const ur_user_id = user_id;
    //console.log(useParams());
    console.log('here');
    console.log(ur_user_id);

    useEffect(() => {
        //let body = {};
	//console.log('show msgs');
        //body['sender_user_id'] = ur_user_id;
        //body['recipient_user_id'] = their_user_id;
	//socket.emit("get messages", body);
    }, []);

    useEffect(() => {
	socket.on("messages", (data) => {
	    console.log('messages');
            //let array = [];
	    //array.map(data, function(value, index) {
	    //	return [value];
	    //});
	    //console.log(typeof data);
	    ////console.log(data.length());
            //let result = []
            //for(var i in data)
	    //    result.push(data[i]);
            //
	    //console.log(typeof result);
	    //console.log(result);

	    //result.sort((a, b)=> {
	    //	return b - a;
	    //});
	    //setMsgsList(result);
	    setMsgsList(data);
	});
    }, [socket]);




    //const sendMessage = async () => {
    const sendMessage = () => {
	console.log('posting msg ');
        let body = {};
        body['message'] = msg;
        body['sender_user_id'] = ur_user_id;
        body['recipient_user_id'] = their_user_id;
	console.log(body);
	socket.emit("chat", body);
	//socket.emit("chat", 'messgae');
    };


    return (
	    <div className="chatContainer">
		<div className="messageInputs">
		<input
		    type="text"
		    placeholder="Message..."
		    onChange={(e) => {
		    setMsg(e.target.value);
		    }} onKeyPress={event => {
		    //if (event.key === 'Enter') {
		    //	sendMessage();
		    //}
		    }}
		/>
		<button onClick={sendMessage}>Send</button>
		</div>
		<div className="messages">

		  {msgsList.map((val, key) => {
                      console.log(val);
		    return (
		    <div
			className="messageContainer"
			id={val.sender_user_id === ur_user_id ? "You" : "Other"}
			key={val.message_id}
			// id={val.author == userName ? "You" : "Other"}
		    >
			<div className="messageIndividual">
			<div><span className="user_name">{val.sender_user_id === ur_user_id ? "You" : 'friend' }</span></div>
                          <div style={{ whiteSpace: 'pre-wrap' }}>
                            {val.message}
                          </div>
			</div>
		    </div>
		    );
                  }
		  )}
		</div>

	    </div>
	);

}



export default Chat;

    //useEffect(() => {
    ////console.log(msg);
    ////setMsgs(c.data);
    //	getMsgs();
    //	const interval = setInterval(() => setTime(Date.now()), 1000);
    //	return () => {
    //	    clearInterval(interval);
    //	};
    //}, [time]);

    //const getMsgs = async () => {
    //	console.log('getting msgs ');
    //	const params = { params: { user1: ur_user_id, user2: their_user_id}};
    //		console.log(params);

    //	try {
    //	    await axios.get('http://localhost:8000/user/message/between', params).then( (c) => {
    //		console.log('got msgs ');
    //		console.log(typeof(c.data));
    //		console.log(c.data);
    //		if (msgsList[0] == null|| c.data[0] == null || msgsList[0]['message_id'] != c.data[0]['message_id']){
    //		    setMsgsList(c.data.reverse());
    //		    console.log('reload');
    //		} else {
    //		    console.log('not reload');
    //		}
    //		//setMsgs(c.data[0]);
    //	    }
    //	    );
    //	} catch (e) {
    //	    console.error(e);
    //	}
    //	//return ( <div>{ms.map(m => <div>{m}</div>)}</div>);
    //	//return ( <div></div>);
    //};
