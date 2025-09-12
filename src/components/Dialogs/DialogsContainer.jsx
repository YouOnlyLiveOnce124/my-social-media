import React from "react";

import Dialogs from "./Dialogs";
import { AuthHoc } from "../../hoc/authHOC";

const DialogsContainer = () => {
  let DialogsWithAuthCheck = AuthHoc(Dialogs);

  return <DialogsWithAuthCheck />;
};

export default DialogsContainer;
