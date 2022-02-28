import React, { useState, useEffect } from "react";
import Perfume from "../../components/Perfume";
import { useAuth } from "../../Auth";
import axios from "axios";
import UserSettingsAPI from "../../apis/UserSettingsAPI";
import styled from "styled-components";
import Search from "./search";


const Home = (props) => {
  const [perfumeList, setPerfumeList] = useState([]);
  const [bookmarkList, setBookmarkList] = useState([]);
  const auth = useAuth();
  const user_id = auth.user && auth.user.id;
  // const user_id = 1;

  async function getPerfumes() {
    try {
      const data = await axios.get("http://localhost:8000/perfume");
      const perfumes = data.data;
      setPerfumeList(perfumes);
    } catch (error) {
      console.error(error);
    }
  }

  async function getBookmarks() {
    try {
      const data = await UserSettingsAPI.get("/bookmark");
      const bookmarkResponse = data.data;
      console.log("mybookmarks: ", bookmarkResponse);
      setBookmarkList(bookmarkResponse);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPerfumes();
    getBookmarks();
  }, []);

  const renderPerfumeList = perfumeList?.map((perfume) => {
    const { name, brand, scents, perfume_id, item_rating } = perfume;

    const checkBookmarks = bookmarkList?.map((bookmark) => {
      if (bookmark.perfume_id === perfume.perfume_id) return true;
      return false;
    });
    const isBookmarked = checkBookmarks.includes(true);

    return (
      <Perfume
        key={perfume_id}
        id={perfume_id}
        name={name}
        brand={brand}
        scents={scents}
        rating={item_rating}
        bookmarked={isBookmarked}
        addBookmark={isBookmarked === false ? addBookmark : null}
        removeBookmark={isBookmarked === true ? removeBookmark : null}
        renderBookmark={true}
      />
    );
  });

  function addBookmark(e, perfume) {
    e.stopPropagation();
    const add = async () => {
      await UserSettingsAPI.post("/bookmark", {
        user_id: user_id,
        perfume_id: perfume.id,
      });
    };
    add();

    const findPerfume = perfumeList.filter((p) => p.perfume_id === perfume.id);
    const addPerfume = findPerfume[0];
    const newList = [...bookmarkList, addPerfume];
    setBookmarkList(newList);
  }

  function removeBookmark(e, perfume) {
    e.stopPropagation();
    // const userId = auth.user.id;
    const perfume_id = perfume.id;
    const rmv = async () => {
      await UserSettingsAPI.delete("/bookmark", {
        user_id: user_id,
        perfume_id: perfume_id,
        data: {
          user_id: user_id,
          perfume_id: perfume_id,
        },
      });
    };
    rmv();

    const newList = bookmarkList?.filter(
      (bookmark) => bookmark.perfume_id !== perfume.id
    );
    setBookmarkList(newList);
  }

  return (
    <Container>
    <Search/>
      ALL PERFUMES
      <PerfumeLayout>{renderPerfumeList}</PerfumeLayout>
    </Container>
  );
};

      //<Heading>All Perfumes</Heading>
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

export default Home;
