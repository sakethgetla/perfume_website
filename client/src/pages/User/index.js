import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router";
import Perfume from "../../components/Perfume";
// when viewing a different user other than yourself

// APIs
import UserAPI from "../../apis/UserAPI";
import UserSettingsAPI from "../../apis/UserSettingsAPI";
import CommentAPI from "../../apis/CommentAPI";

const User = (props) => {
  const [details, setDetails] = useState();
  const [comments, setComments] = useState();
  const [likes, setLikes] = useState();
  const [dislikes, setDislikes] = useState();
  const [bookmarks, setBookmarks] = useState();
  const user_id = props.match.params.id;

  useEffect(() => {
    async function getUser() {
      try {
        getUserDetails();
        getLikes();
        getDislikes();
        getBookmarks();
        getComments();
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
  }, []);

  async function getUserDetails() {
    try {
      const userDetails = await UserAPI.get("", {
        params: { user_id: user_id },
      });
      let firstname = userDetails.data[0].first_name;
      let lastname = userDetails.data[0].last_name;
      let fullname = firstname + " " + lastname;
      setDetails(fullname);
    } catch (err) {
      console.error(err);
    }
  }

  async function getLikes() {
    try {
      const response = await UserSettingsAPI.get("/like", {
        params: { user_id: user_id },
      });
      const listOfLikes = response.data;
      setLikes(listOfLikes);
    } catch (err) {
      console.error(err);
    }
  }

  async function getDislikes() {
    try {
      const response = await UserSettingsAPI.get("/dislike", {
        params: { user_id: user_id },
      });
      const listOfDislikes = response.data;
      setDislikes(listOfDislikes);
    } catch (err) {
      console.error(err);
    }
  }

  async function getBookmarks() {
    try {
      const response = await UserSettingsAPI.get("/bookmark", {
        params: { user_id: user_id },
      });
      const listOfBookmarks = response.data;
      setBookmarks(listOfBookmarks);
    } catch (err) {
      console.error(err);
    }
  }

  async function getComments() {
    try {
      const response = await CommentAPI.get(`/?user_id=${user_id}`);
      const userComments = response.data;
      console.log(userComments);
      setComments(userComments);
    } catch (err) {
      console.error(err);
    }
  }

  const renderPerfumeList = (list, heading) => (
    <>
      {list?.map((item) => {
        const { perfume_id, name, scents, item_rating } = item;
        return (
          <Perfume
            key={perfume_id}
            id={perfume_id}
            name={name}
            tags={scents}
            rating={item_rating}
          />
        );
      })}

      {/* {list?.length == 0 && <p>No {heading}</p>} */}
    </>
  );

  const renderName = () => <>{details}</>;

  const renderComments = () => (
    <div>
      {comments?.map((comment) => {
        const id = comment.id;
        const content = comment.comment;
        const rating = comment.rating;
        const time = comment.sent_time;
        return (
          <div key={id}>
            <p>{content}</p>
            <p>{rating}</p>
            <p>Posted on: {time}</p>
          </div>
        );
      })}
      {comments?.length == 0 && <p>No comments</p>}
    </div>
  );

  return (
    <Container>
      <Heading>Name: {renderName()}</Heading>
      <Heading>List of Comments</Heading>
      {renderComments()}
      <Heading>List of Likes</Heading>
      <PerfumeLayout>{renderPerfumeList(likes, "Likes")}</PerfumeLayout>
      <Heading>List of Dislikes</Heading>
      <PerfumeLayout>{renderPerfumeList(dislikes, "Likes")}</PerfumeLayout>
      <Heading>List of Bookmarks</Heading>
      <PerfumeLayout>{renderPerfumeList(bookmarks, "Likes")}</PerfumeLayout>
    </Container>
  );
};

const Container = styled.div`
  font-size: 16px;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
  align-self: center;
  padding-bottom: 100px;
`;

const Heading = styled.h3`
  margin: 48px 0 24px 0;
`;

const PerfumeLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 32px;
`;

export default withRouter(User);
