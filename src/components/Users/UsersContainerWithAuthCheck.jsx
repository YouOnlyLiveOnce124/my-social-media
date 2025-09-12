import React from "react";

import { AuthHoc } from "../../hoc/authHOC";
import UsersContainer from "./UsersContainer";

const UsersContainerWithAuthCheck = () => {
  let UserContainerCheckAuth = AuthHoc(UsersContainer);

  return <UserContainerCheckAuth />;
};

export default UsersContainerWithAuthCheck;
