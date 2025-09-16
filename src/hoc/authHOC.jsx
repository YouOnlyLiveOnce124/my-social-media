import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AuthHOC = (Component) => {
  return (props) => {
    const isAuth = useSelector((state) => state.auth.isAuth);

    return isAuth ? <Component {...props} /> : <Navigate to="/login/" />;
  };
};
