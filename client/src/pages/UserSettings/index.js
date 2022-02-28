import React from "react";
import styled from "styled-components";
import EditPerfume from "./components/Buttons/ButtonEditPerfume";
import Bookmarks from "./components/Buttons/ButtonBookmarks";
import Likes from "./components/Buttons/ButtonLikes";
import Dislikes from "./components/Buttons/ButtonDislikes";
import EditProfile from "./components/Buttons/ButtonEditProfile";
import Typography from "@material-ui/core/Typography";

const UserSettings = () => {
  return (
    <Container>
      <Centered>
        <Heading>
          <Typography variant='h3'>User Settings</Typography>
        </Heading>
        <Value>
          <Typography>Edit Profile</Typography>
          <ValueButton>
            <EditProfile />
          </ValueButton>
        </Value>
        <Value>
          <Typography>Edit Perfumes</Typography>
          <ValueButton>
            <EditPerfume />
          </ValueButton>
        </Value>
        <Value>
          <Typography>View Likes</Typography>
          <ValueButton>
            <Likes />
          </ValueButton>
        </Value>
        <Value>
          <Typography>View Dislikes</Typography>
          <ValueButton>
            <Dislikes />
          </ValueButton>
        </Value>
        <Value noBorder>
          <Typography>Edit Bookmarks</Typography>
          <ValueButton>
            <Bookmarks />
          </ValueButton>
        </Value>
      </Centered>
    </Container>
  );
};

const Heading = styled.h1`
  margin: 48px 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Centered = styled.div`
  display: flex;
  flex: 0 1;
  flex-direction: column;
  width: 500px;
  align-self: center;
  justify-self: center;
`;

const Value = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  margin-bottom: 32px;
  width: 100%;

  padding-bottom: 32px;
  border-bottom: ${(props) => (!props.noBorder ? "1px solid #ececec" : null)};
`;

const ValueLabel = styled.label`
  display: flex;
  justify-self: flex-start;
  align-self: center;
  margin-right: 16px;
  margin-bottom: ${(props) => (props.marginBottom ? "16px" : "0")};
`;

const ValueButton = styled.div`
  border-radius: 8px;
  background: #ececec;
  border: 0px;
  padding: 2px 4px;

  margin-left: auto;
  padding: 12px 36px;
  cursor: pointer;
  // margin-bottom: 32px;

  :hover {
    background: #f3f4f4;
  }
`;

export default UserSettings;
