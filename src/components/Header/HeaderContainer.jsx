import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "./Header";
import { thunkCreatorLogin, thunkLogOut } from "../../reducer/AuthReducer";

const HeaderContainerComponent = () => {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const methodsHeader = {
    thunkLogin: () => {
      dispatch(thunkCreatorLogin());
    },
    logOut: () => {
      dispatch(thunkLogOut());
    },
  };

  return (
    <HeaderApiComponent
      setLoginForHeaderApi={methodsHeader.thunkLogin}
      logOut={methodsHeader.logOut}
      state={state}
    />
  );
};

class HeaderApiComponent extends React.Component {
  // componentDidMount() {
  //   this.props.setLoginForHeaderApi();
  // }

  render() {
    return <Header {...this.props} logOut={this.props.logOut} />;
  }
}

export default HeaderContainerComponent;
