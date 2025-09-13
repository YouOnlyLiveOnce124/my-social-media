import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { thunkCreatorLogin, thunkLogOut } from "../../reducer/AuthReducer";

const HeaderContainerComponent = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const thunkLogin = () => {
    dispatch(thunkCreatorLogin());
  };

  const logOut = () => {
    dispatch(thunkLogOut());
  };

  return (
    <Header setLoginForHeaderApi={thunkLogin} logOut={logOut} state={state} />
  );
};

export default HeaderContainerComponent;
