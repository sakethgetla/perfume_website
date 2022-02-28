import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, Route, useRouteMatch } from "react-router-dom";
import Chat from "./components/Chat";
import io from "socket.io-client";
import { useAuth, Logout } from "./../../Auth";
//const CONNECTION_PORT = '127.0.0.1:8000/user/message';
//const CONNECTION_PORT = "http://localhost:8000/user/message'";
const CONNECTION_PORT = "localhost:8000/";
//const CONNECTION_PORT = "localhost:8000/";



const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    marginTop: 64,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    margin: theme.spacing(1),
    marginTop: "40px",
    marginBottom: "40px",
  },
  label: {
    margin: theme.spacing(1),
    marginBottom: "20px",
  },
  addButton: {
    marginTop: '40px',
  }

}));



//const socket = io.connect(CONNECTION_PORT);
let socket;
socket = io.connect('/');
console.log('created sockets ');


const UserChat = () => {
    const [userList, setUserList] = useState([]);
    const [recipient_user_id, setRecipient_user_id] = useState(0);
    const auth = useAuth();
    const sender_user_id = auth.user.id;

    console.log(auth);
    //useEffect(() => {
    //	socket = io.connect(CONNECTION_PORT);
    //	console.log('heere connections ');
    //	socket.emit("message", {userList});
    //}, [CONNECTION_PORT]);
// import "./App.css";


    useEffect(() => {
	console.log('heere users ');
        getusers();
	//socket = io(CONNECTION_PORT);
    	//socket.emit("message", {userList});
        if (sender_user_id ==1) {
            setRecipient_user_id(2);
        }else{
            setRecipient_user_id(1);
	}
    }, []);

    useEffect(() => {
	//socket.on("receive_message", (data) => {
	////setMessageList([...messageList, data]);

	//    console.log('heere msg recieved ');
	//});

        refresh();
    }, [recipient_user_id]);


    const getusers = async () => {
	console.log('getting users ');

	try {
	    await axios.get('http://localhost:8000/user').then( (c) => {
		console.log(typeof(c.data));
		console.log(c.data);
                //users = c.data;
                setUserList(c.data);
	    });
	} catch (e) {
	    console.error(e);
	}
    };

    const refresh = () => {
	console.log('refresh msgs ');
        let body = {};
	console.log('vshow msgs');
        body['sender_user_id'] = sender_user_id;
        body['recipient_user_id'] = recipient_user_id;
	console.log(body);
	console.log('^show msgs');
	socket.emit("get messages", body);
    };

    const {path} = useRouteMatch();
    return (

	<div>

      <h1> User List </h1>

	    {userList.map((val, key) => {
		return (
                    <div key={val.user_id}>
                    {sender_user_id !== val.user_id ? (
                         <div >
                      <div>
			<Button variant='contained' onClick={() => setRecipient_user_id(val.user_id)}>
			    {val.first_name}
			</Button>
                      </div>

                    </div>
		    ) : (
                        <div>
                        </div>
                    )}
	    </div>

                        );

	    })}
          <Chat
	    user_id={sender_user_id}
	    recipient_user_id={recipient_user_id}
	    socket={socket}
          />
	</div>

    );
};


export default UserChat;

			//<button to={`./${val.user_id}`} onCick={() => setRecipient_user_id(val.user_id)}>

////import Chat from "./App";
//
////ReactDOM.render(
////  <App />,
////
////  document.getElementById("root")
////);
//
//import {Link, useRouteMatch, Route, useParams} from "react-router-dom";
//import { useAuth, Logout } from "./../../Auth";
//import Users from "./components/display_users";
//import Chat from "./components/Chat";
//import "./App.css";
//
//function UserChat() {
//    const id = useParams();
//    const auth = useAuth();
//    const ur_user_id = auth.user.id;
//
//    console.log('here');
//    const {path} = useRouteMatch();
//    return (
//        <div>
//	    <Users/>
//        </div>
//    );
//};
//	  //<Link to={`${path}/`} />
//	  //<Link to={`${path}/:id`}> component={Chat}/>
//	  //<Route path={`${path}/:id`} component={Chat}>
//
//export default UserChat;
