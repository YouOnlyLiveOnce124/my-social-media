import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Dialogs from "./Dialogs";

const DialogsContainer = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/login/" />;
  }

  return <Dialogs />;
};

export default DialogsContainer;
