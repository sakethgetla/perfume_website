import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import CommentCSS from "./Comment.module.css";

const Comment = (props) => {
  const [Comment, setComment] = useState("");
  const [CommentList, setCommentList] = useState([]);
  const [Rate, setRate] = useState(null);
  const [CommentObjectList, setCommentObjectList] = useState([]);

  useEffect(async () => {
    // get comment list
    let res = await axios.get('http://localhost:8000/perfume/comment',
      {
        params: {
          perfume_id: props.perfume_id
        }
    });
    
    console.log("server sends the following comment list") 
    console.log(res.data);
    let list = [];
    res.data.map((item) => {
      list.push(item)
    })
    setCommentObjectList(list)
  }, [])

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const submitComment = async(e) => {
    // upload comment to backend
    const options = {
      perfume_id: props.perfume_id,
      user_id: props.user_id,
      comment: Comment,
      rating: Rate
    };
   
    if (Rate === null) {
      console.log("You have not rated yet!")
    } else if (Comment === "") {
      console.log("Please don't post a empty comment!")
    } else {
      await axios.post('http://localhost:8000/perfume/comment', options).then((response) => {
        setComment("");
        console.log(response);
      })
      .catch(error => {
        console.log("failed to upload comment form to database");
        console.log(error);
      });
	    updateComment(Comment);
    
    }
  };
  
  // update comment list
  const updateComment = (newComment) => {
    setCommentList(CommentList.concat(newComment));
  }
  
  // const convertEpochTime = (time) => {
  //   const date = new Date(time * 1000)
  // };

  return (
    <div>
      {/* Comment list */}
      <div>
        <h3> See other users' comment</h3>
        {CommentObjectList.map((obj, i) => {
          return <div className = {CommentCSS.singleComment}  key = {i} style={{display: 'flex'}}>
            <p>{obj.comment} </p> 
            <p style={{ marginLeft: "auto"}}>Rating: {obj.rating} / 5 </p>    
            {/*<p> Time: {obj.sent_time} </p>*/}
            </div>
        })} 

        {CommentList.map((comment, i) => {
          return <div className = {CommentCSS.singleComment} key = {i} style={{display: 'flex'}}>
            <p> {comment} </p> 
            <p style={{ marginLeft: "auto" }}>Rating: {Rate} / 5 </p>    
            {/*<p> Time: Just now </p>*/}
            </div>
        })} 
      </div>

      {/* Bottom comment form section*/}
      <div className={CommentCSS.comment}>
        <h3>Leave a review if you like!</h3>
        <div className={CommentCSS.stars}>
          <input type="radio" name="rate" id="rate-5" onClick={() => setRate(5)}/>
          <label htmlFor="rate-5" className={CommentCSS.icons}>
            <FontAwesomeIcon icon="star" />
          </label>
          <input type="radio" name="rate" id="rate-4" onClick={() => setRate(4)}/>
          <label htmlFor="rate-4" className={CommentCSS.icons}>
            <FontAwesomeIcon icon="star" />
          </label>
          <input type="radio" name="rate" id="rate-3" onClick={() => setRate(3)}/>
          <label htmlFor="rate-3" className={CommentCSS.icons}>
            <FontAwesomeIcon icon="star" />
          </label>
          <input type="radio" name="rate" id="rate-2" onClick={() => setRate(2)}/>
          <label htmlFor="rate-2" className={CommentCSS.icons}>
            <FontAwesomeIcon icon="star" />
          </label>
          <input type="radio" name="rate" id="rate-1" onClick={() => setRate(1)}/>
          <label htmlFor="rate-1" className={CommentCSS.icons}>
            <FontAwesomeIcon icon="star" />
          </label>
        </div>

        <form onSubmit={() => submitComment()}>
          <div className={CommentCSS.commentSection}>
            <textarea
              cols="20"
              id="commentContent"
              onChange={handleChange}
              value={Comment}
              placeholder="share your thoughts with the community!"
            ></textarea>
          </div>

          <div className={CommentCSS.commentbtn}>
            <button type="button" id="commentbtn" onClick={submitComment}>
              COMMENT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comment;
