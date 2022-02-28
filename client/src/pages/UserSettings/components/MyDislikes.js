import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../Auth";
import UserSettingsAPI from "../../../apis/UserSettingsAPI";
import Perfume from "../../../components/Perfume";

const MyDislikes = () => {
  const [dislikes, setDislikes] = useState();
  const auth = useAuth();
  const user_id = auth.user && auth.user.id;

  // fetch all myDislikes
  useEffect(() => {
    // const user_id = auth.user.id;
    async function getDislikes() {
      try {
        const response = await UserSettingsAPI.get("/dislike", {
          params: { user_id: user_id },
        });
        console.log("response: ", response);
        const listOfDislikes = response.data;
        setDislikes(listOfDislikes);
        console.log("listOfPerfumes: ", listOfDislikes);
      } catch (err) {
        console.error(err);
      }
    }

    getDislikes();
  }, []);

  useEffect(() => {
    console.log("updated dislikes: ", dislikes?.length);
  }, [dislikes]);

  // remove perfume from dislikes
  function removeDislike(perfume) {
    // const userId = auth.user.id;
    const perfume_id = perfume.id;
    const rmv = async () => {
      UserSettingsAPI.delete("/dislike", {
        perfume_id: perfume_id,
        user_id: user_id,
      });
    };
    rmv();
    const newList = dislikes?.filter((dislike) => dislike.id !== perfume.id);
    setDislikes(newList);
  }

  const renderList = () => {
    return dislikes.map((dislike) => {
      const { perfume_id, name, scents, item_rating } = dislike;
      return (
        <Perfume
          key={perfume_id}
          id={perfume_id}
          name={name}
          tags={scents}
          rating={item_rating}
          // removeDislike={removeDislike}
        />
      );
    });
  };

  const renderEmpty = () => {
    return <p>We do not have dislikes</p>;
  };

  function renderDislikes() {
    const haveDislikes = dislikes?.length > 0 ? true : false;
    if (haveDislikes) {
      let listTemplate = renderList();
      return listTemplate;
    }
    let emptyListTemplate = renderEmpty();
    return emptyListTemplate;
  }

  return (
    <Container>
      <Heading>My Dislikes</Heading>
      <PerfumeLayout>{renderDislikes()}</PerfumeLayout>
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
`;

const Heading = styled.h3`
  margin: 48px 0;
`;

const PerfumeLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 32px;
  padding-bottom: 150px;
`;

export default MyDislikes;
