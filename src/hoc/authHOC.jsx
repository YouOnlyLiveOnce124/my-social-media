import React from "react";
import { Navigate } from "react-router-dom";

export const AuthHOC = (Component) => {
  return class NavigateComponent extends React.Component {
    render() {
      // isAuth должен передаваться как prop из контейнера
      return this.props.isAuth ? (
        <Component {...this.props} />
      ) : (
        <Navigate to="/login/" />
      );
    }
  };
};
