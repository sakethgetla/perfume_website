import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import FontAwesomeIcons from "./FontAwesomeIcons";  //Importing icons, deleting this will result in missing icons.

const LikeDislike = (props) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [likedState, setLikedState] = useState(false);
  const [dislikedState, setDislikedState] = useState(false);

  // const options = {
  //   perfume_id: props.perfume_id,
  //   user_id: props.user_id
  // }

  const get_options = {
      params: {
        perfume_id: props.perfume_id,
        user_id: props.user_id
      }
  }

  const options = {
    perfume_id: props.perfume_id,
    user_id: props.user_id,
  }

  let id = props.user_id
  console.log("user_id is " + id)

  // fetching number of likes and dislikes from database when on mount
  useEffect(async () => {
    fetchLike();
    fetchDislike();
  },[]);
  
  // Handle click on like button.
  function handlelike() {
    // checking liked state,  a user should only like/dislike a perfume once. 
    if (likedState === true) {
      deleteLike()
    } else if (dislikedState === true) {
      addLike()
      deleteDislike()
    } else {
      addLike()
    }
    console.log("number of likes is " + likes);
  }

  function handledislike() {
    if (dislikedState === true) {
      deleteDislike()
    } else if (likedState === true) {
      addDislike()
      deleteLike()
    } else {
      addDislike()
    }
    console.log("number of dislikes is " + dislikes);
    console.log(dislikes);
  }


  // fetch number of likes from database
  const fetchLike = () => {
    axios.get('http://localhost:8000/user/setting/like', get_options).then((response) => {  
      console.log("the server send likes")
      console.log(response.data)      
      let numberOfLikes = Object.keys(response.data).length;
      console.log(numberOfLikes);
      setLikes(numberOfLikes)  
    })
  }

  const fetchDislike = () => {
    axios.get('http://localhost:8000/user/setting/dislike', get_options).then((response) => {   
      let numberOfDislikes = Object.keys(response.data).length;
      console.log(numberOfDislikes);
      setDislikes(numberOfDislikes)
    }) 
  }

  // POST request to server for like button
  const addLike = () => {
    axios.post('http://localhost:8000/user/setting/like', options).then((response) => {
        setLikes(likes + 1);
        console.log("update perfume likes count SUCCESS")
  })
  .catch(error => {
    console.log(error);
  })
  .then(setLikedState(true))
  };

  // POST request to server for dislike button
  const addDislike = () => {
    axios.post('http://localhost:8000/user/setting/dislike', options).then((response) => {
      setDislikes(dislikes + 1);
      console.log("update perfume dislikes count SUCCESS")
  })
    .catch(error => {
    console.log(error);
  })
 .then(setDislikedState(true))
 };

  // cancel like
  const deleteLike = () => {
    axios.delete('http://localhost:8000/user/setting/like', {
      data: {
        perfume_id: props.perfume_id,
        user_id: props.user_id
      }
    }).then((response) => {
     setLikes(likes - 1);
     setLikedState(false);
     console.log("delete like Success")
  })
  .catch(error => {
   console.log(error);
  })
};

  // cancel dislike
  const deleteDislike = () => {
    axios.delete('http://localhost:8000/user/setting/dislike', {
      data: {
        perfume_id: props.perfume_id,
        user_id: props.user_id
      }
    }).then((response) => {
      setDislikes(dislikes - 1);
      setDislikedState(false);
      console.log("delete dislike Success")
  })
  .catch(error => {
    console.log(error);
  })
};

  return (
    // Displaying like and dislike button
    <> 
      <div style={{display: 'flex' }}>
        <button style={{ marginRight: "10px"}} onClick={() => handlelike()} id="likebtn">
          <FontAwesomeIcon icon="thumbs-up" />
        </button>
        <p > {likes} </p>

        <button style={{ marginLeft: "20px", marginRight: "10px"}} onClick={() => handledislike() } id="dislikebtn">
          <FontAwesomeIcon icon="thumbs-down" />
        </button>
        <p> {dislikes} </p>
      </div>
    </>
  );
};

export default LikeDislike;
