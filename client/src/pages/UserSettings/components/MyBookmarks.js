import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../Auth";
import UserSettingsAPI from "../../../apis/UserSettingsAPI";
import Perfume from "../../../components/Perfume";

const MyBookmarks = () => {
  const [bookmarks, setBookmarks] = useState();
  const auth = useAuth();
  const user_id = auth.user && auth.user.id;
  // const user_id = 1;

  // fetch all myBookmarks
  useEffect(() => {
    // const user_id = auth.user.id;
    async function getBookmarks() {
      try {
        const response = await UserSettingsAPI.get("/bookmark", {
          params: { user_id: user_id },
        });
        console.log("response: ", response);
        const listOfBookmarks = response.data;
        setBookmarks(listOfBookmarks);
        console.log("listOfPerfumes: ", listOfBookmarks);
      } catch (err) {
        console.error(err);
      }
    }

    getBookmarks();
  }, []);

  useEffect(() => {
    console.log("updated bookmarks: ", bookmarks?.length);
  }, [bookmarks]);

  // remove perfume from bookmarks
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

    const newList = bookmarks?.filter(
      (bookmark) => bookmark.perfume_id !== perfume.id
    );
    setBookmarks(newList);
  }

  const renderList = () => {
    return bookmarks.map((bookmark) => {
      const { perfume_id, name, scents, item_rating } = bookmark;

      return (
        <Perfume
          key={perfume_id}
          id={perfume_id}
          name={name}
          tags={scents}
          rating={item_rating}
          bookmarked={true}
          removeBookmark={removeBookmark}
          renderBookmark={true}
        />
      );
    });
  };

  const renderEmpty = () => {
    return <p>We do not have bookmarks</p>;
  };

  function renderBookmarks() {
    const haveBookmarks = bookmarks?.length > 0 ? true : false;
    if (haveBookmarks) {
      let listTemplate = renderList();
      return listTemplate;
    }
    let emptyListTemplate = renderEmpty();
    return emptyListTemplate;
  }

  return (
    <Container>
      <Heading>My Bookmarks</Heading>
      <PerfumeLayout>{renderBookmarks()}</PerfumeLayout>
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

export default MyBookmarks;
