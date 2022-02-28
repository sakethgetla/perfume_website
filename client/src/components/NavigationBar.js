import React from "react";
import { Page } from "./Page";
import { useHistory } from 'react-router-dom';
import { useAuth } from "../Auth";
// import styled from "styled-components";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import styled from "styled-components";

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
    marginTop: "20px",
    marginBottom: "20px",
  },
  label: {
    margin: theme.spacing(1),
    marginBottom: "20px",
  },
  addButton: {
    marginTop: '40px',
  }

}));

const NavigationBar = () => {
  const classes = useStyles();
  const auth = useAuth();
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path);
  }

          //<Button style={{justifyContent: "left"}} onClick={() => handleClick("/search")}>Search</Button>
  return (
    <Drawer className={classes.drawer} classes={{paper: classes.drawerPaper}} variant="permanent">
      {/* <Page to="/">Home</Page> */}
      <Container>
      <Typography className={classes.title} color="textSecondary" variant="h6">FILTER</Typography>
        <ButtonGroup fullWidth orientation="vertical" variant="text">
          <Button style={{justifyContent: "left"}} onClick={() => handleClick("/")}>Home</Button>
          <Button style={{justifyContent: "left"}} onClick={() => handleClick("/myrecommendations")}>Recommendations</Button>
          <Button style={{justifyContent: "left"}} onClick={() => handleClick("/chat")}>Chat</Button>
        </ButtonGroup>
      <Divider />
      {auth.user && 
        <div>
        <Typography className={classes.label} color="textSecondary" variant="h6">SETTINGS</Typography>
        <ButtonGroup fullWidth orientation="vertical" variant="text">
          <Button style={{justifyContent: "left"}} onClick={() => handleClick("/userSettings")}>Profile</Button>
          <Button style={{justifyContent: "left"}} onClick={() => handleClick("/comments")}>Reviews</Button>
          <Button style={{justifyContent: "left"}} onClick={() => handleClick("/bookmarks")}>Bookmarks</Button>
        </ButtonGroup>
        <Button fullWidth className={classes.addButton} variant="contained" color='default' onClick={() => handleClick("/addPerfume")}>Add Perfume</Button>
        </div>
      }
      </Container>
    </Drawer>
  );
};

//<<<<<<< HEAD
//// const Nav = styled.div`
////   display: block;
////   background: red;
//// `;
//=======
//const Nav = styled.div`
//  display: flex;
//  flex: 0 0 160px;
//  padding: 24px;
//  padding-top: 36px;
//  border-right: 1px solid black;
//  flex-direction: column;
//`;
//>>>>>>> merge_ts_with_backend_new

export default NavigationBar;
