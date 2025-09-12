import React from "react";

import { AuthHoc } from "../../hoc/authHOC";
import ProfileContainer from "../ViewField/ProfileContainer";

const ProfileContainerWithCheckAuth = () => {
  let ProfileContainerCheckAuth = AuthHoc(ProfileContainer);

  return <ProfileContainerCheckAuth />;
};

export default ProfileContainerWithCheckAuth;
