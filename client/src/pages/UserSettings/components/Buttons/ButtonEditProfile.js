import React from "react";
import { Page } from "../../../../components/Page";
import { useAuth } from "../../../../Auth";
import Typography from "@material-ui/core/Typography";
const EditProfile = () => {

    const auth = useAuth();

  return (
    <>
      <Page to={`/user/${auth.user.id}/edit`}>
        <Typography>Edit Profile</Typography>
      </Page>
    </>
  );
};

export default EditProfile;
