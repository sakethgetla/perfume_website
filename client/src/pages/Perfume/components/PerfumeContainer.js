import React from "react";
import { useState, useEffect } from "react";
import LikeDislike from "./LikeDislike";
import Comment from "./Comment/Comment";
import axios from "axios";
import  {useAuth } from "../../../Auth.js";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({

  root: {
      margin: theme.spacing(1),
      width: '30%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      justifyContent: 'left',
  },
  info: {
    margin: theme.spacing(1),
  }

}))

const PerfumePage = props => {

  const classes = useStyles();
  // Initiation
  let auth = useAuth();
  let user_id
  let perfume_id = props.match.params.id

  if (auth.user === null) {
    console.log("the user_id got from auth is null, so for now i set it to be 1 instead")
    user_id = 1;
  } else { user_id = auth.user.id}

  const [PerfumeItem, setPerfumeItem] = useState({});

  // Fetching data from database when on mount.
  useEffect(async () => {
   axios.get('http://localhost:8000/perfume', {
      params: {
          perfume_id
       }
    }).then((response) => {
      const data = response.data;
      console.log(response.data);
      setPerfumeItem(data[0]);
      console.log("get perfume SUCCESS");
    })
    .catch(err => {
      console.log(err)
      console.log("cant get perfume");
    })
  }, []);

  return (
    <Container className={classes.root}>
      <Typography className={classes.info} variant="h4">{PerfumeItem.name}</Typography>
      <Typography className={classes.info}>Brand： {PerfumeItem.brand}</Typography>
      <Typography className={classes.info}>Old Price： ${PerfumeItem.old_price}</Typography>
      <Typography className={classes.info}>New Price： ${PerfumeItem.new_price}</Typography>
      <Typography className={classes.info}>Net Weight: {PerfumeItem.ml} ml</Typography>
      <Typography className={classes.info}>Gender: {PerfumeItem.department}</Typography>
      <Typography className={classes.info}>Scents: {PerfumeItem.scents}</Typography>
      <Typography className={classes.info}>Seller: {PerfumeItem.seller}</Typography>
      <Typography className={classes.info}>Rating: {PerfumeItem.item_rating}/5</Typography>

      <LikeDislike user_id = {user_id} perfume_id = {perfume_id}/>
      <Comment user_id = {user_id} perfume_id = {perfume_id}/>
      
    </Container>
  );
}



export default PerfumePage;
