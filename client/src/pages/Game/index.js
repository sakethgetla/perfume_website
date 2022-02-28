import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, Route, useRouteMatch } from "react-router-dom";
import Chat from "./components/Chat";

const UserGame = () => {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
	console.log('heere users ');
        getusers();
    }, []);

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


    //let users = getusers();
    //const showUsers = () => {

    //	return (
    //	    <>
    //	      {users.map((val, key) => {
    //              return (
    //                  <div key={val.user_id}>
    //                    {val.first_name}
    //                  </div>
    //              );

    //        })}
    //	    </>
    //	);
    //};
    const {path} = useRouteMatch();
    return (
	<div>
	    {userList.map((val, key) => {
		return (
                    <p key={val.user_id}>
                      <div>
			<Link to={`./${val.user_id}`} >
			    {val.first_name}
			</Link>
                      </div>

                    </p>
		);

	    })}
          <Chat/>
	</div>

    );
};


export default UserChat;

