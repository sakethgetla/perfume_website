import React from "react";
import { useState } from "react"
import { Page } from "./Page";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../Auth";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import TextField from "@material-ui/core/TextField";
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import Box from '@material-ui/core/Box';

import logo from './logo.png';

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    display: 'flex',
    margin: theme.spacing(0),
  },
  appbar: {
    zIndex: theme.zIndex.drawer + 1
  },
  logo: {
    margin: theme.spacing(0),
    marginLeft: -20,
    marginRight: 2,
  },
  title: {
    flexGrow: 1,
  },
  login: {
    position: 'relative',
    marginLeft: 0,
  },
  buttons: {
    margin: theme.spacing(0.5),
  }

}))

const Header = () => {

  const classes = useStyles();
  const auth = useAuth();
  const history = useHistory();
  const [anchorE1, setAnchorE1] = useState(null);

  const handleMenu = (event) => {
    setAnchorE1(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorE1(null);
  };

  const handleClick = (path) => {
    history.push(path);
  }

//<<<<<<< HEAD
//    <header>
//      <h3>Perfume Scent</h3>
//      {auth.user ? (
//        <div>
//        <Page to="/">Home</Page>
//        <Page to={"/user/" + auth.user.id}>Profile</Page>
//        <Page to="/userSettings">User Settings</Page>
//          <Page to="/chat">User chat</Page>
//          <Page to={`/myrecommendations`}>User recommedations</Page>
//        <Logout />
//        </div>
//      ) : (
//        <Page to="/login">Log in</Page>
//      )}
//    </header>
//=======
  return (
    <div className={classes.root}>
      <AppBar color='primary' className={classes.appbar}>
      <Toolbar>
        <Button className={classes.logo} onClick={() => handleClick("/")}><img src={logo} width="80px"/></Button>
        <Typography className={classes.title}></Typography>
        {auth.user ? (
          <div>
          <Button className={classes.buttons} variant="contained" color="primary" disableElevation onClick={handleMenu} startIcon={<Avatar>{auth.user.profilePic}</Avatar>} endIcon={<KeyboardArrowDownIcon />}>{auth.user.first_name + ' ' + auth.user.last_name}</Button>
          <Menu 
            id="profile-menu"
            anchorEl={anchorE1} 
            keepMounted 
            open={Boolean(anchorE1)} 
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={() => {handleClick("/user/" + auth.user.id);handleClose()}}>
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              Reviews
            </MenuItem>
            <MenuItem onClick={() => {handleClick("/chat");handleClose()}}>
              chat
            </MenuItem>
            <MenuItem onClick={() => {handleClick("/myrecomendations");handleClose()}}>
              recs
            </MenuItem>
            <MenuItem onClick={() => {handleClick("/bookmarks");handleClose()}}>
              Bookmarks
            </MenuItem>
            <Divider />
            <MenuItem primary="#f44336" onClick={() => {auth.signout(() => history.push("/"));handleClose()}} color="primary">
              Logout
            </MenuItem>
          </Menu>
          </div>
        ) : (
          <div className={classes.login}>
          <Button className={classes.buttons} variant="contained" color='primary' disableElevation onClick={() => handleClick("/login")}>Log in</Button>
          <Button className={classes.buttons} variant="contained" color='primary' disableElevation onClick={() => handleClick("/register")}>Register</Button>
          </div>
        )}    
      </Toolbar>
      </AppBar>
    </div>
  );
};

          //<Page to={`/chat/${auth.user.id}`}>User chat</Page>
export default Header;
