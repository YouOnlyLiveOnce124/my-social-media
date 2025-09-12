import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export let AuthHoc = (Component) => {
  const checkAuth = useSelector((state) => state.auth.isAuth);

  class NavigateComponent extends React.Component {
    render() {
      return checkAuth ? (
        <Component {...this.props} />
      ) : (
        <Navigate to="/login/" />
      );
    }
  }
  return NavigateComponent;
};
