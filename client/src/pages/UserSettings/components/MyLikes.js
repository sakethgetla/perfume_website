import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../Auth";
import axios from "axios";
import Perfume from "../../../components/Perfume";

const MyLikes = () => {
  const [likes, setLikes] = useState();
  const auth = useAuth();
  const user_id = auth.user && auth.user.id;

  // fetch all myLikes
  useEffect(() => {
    // const user_id = auth.user.id;
    async function getLikes() {
      try {
        const response = await axios.get(
          "http://localhost:8000/user/setting/like",
          { params: { user_id: user_id } }
        );
        console.log("response: ", response);
        const listOfLikes = response.data;
        setLikes(listOfLikes);
        console.log("listOfPerfumes: ", listOfLikes);
      } catch (err) {
        console.error(err);
      }
    }

    getLikes();
  }, []);

  useEffect(() => {
    console.log("updated likes: ", likes?.length);
  }, [likes]);

  // remove perfume from likes
  function removelike(perfume) {
    // const userId = auth.user.id;
    const perfume_id = perfume.id;
    const rmv = async () => {
      axios.delete("localhost:8000/user/setting/like", {
        perfume_id,
        user_id,
      });
    };
    rmv();
    const newList = likes?.filter((like) => like.id !== perfume.id);
    setLikes(newList);
  }

  const renderList = () => {
    return likes.map((like) => {
      const { perfume_id, name, scents, item_rating } = like;
      return (
        <Perfume
          key={perfume_id}
          id={perfume_id}
          name={name}
          tags={scents}
          rating={item_rating}
          // removelike={removelike}
        />
      );
    });
  };

  const renderEmpty = () => {
    return <p>We do not have likes</p>;
  };

  function renderLikes() {
    const haveLikes = likes?.length > 0 ? true : false;
    if (haveLikes) {
      let listTemplate = renderList();
      return listTemplate;
    }
    let emptyListTemplate = renderEmpty();
    return emptyListTemplate;
  }

  return (
    <Container>
      <Heading>My Likes</Heading>
      <PerfumeLayout>{renderLikes()}</PerfumeLayout>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
  align-self: center;
  padding-bottom: 100px;
`;

const Heading = styled.h3`
  margin: 48px 0;
`;

const PerfumeLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 32px;
`;

export default MyLikes;
