import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  followAC,
  showUsers,
  unFollowAC,
  setCurPage,
  getUserCountAC,
  toggleIsFetchingAC,
  disabledBtnAC,
  gerUserThunkCreator,
  followOrUnfollow,
} from "../../reducer/UsersPageReducer";
import UsersFunctionalComponent from "./UsersFunctionalComponent";
import Loader from "../GeneralItems/Loader";

const UsersContainer = () => {
  // контейнерная компонента для связи со стейтом, где я диспатчу методы и данные из стейта для userPage,
  const state = useSelector((state) => state.userPage);
  const stateAuth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const methodsForUser = {
    follow: (userId) => {
      dispatch(followAC(userId));
    },
    unFollow: (userId) => {
      dispatch(unFollowAC(userId));
    },
    show: (users) => {
      dispatch(showUsers(users));
    },
    setPageNumber: (pageNumber) => {
      dispatch(setCurPage(pageNumber));
    },
    getUserCount: (totalCount) => {
      dispatch(getUserCountAC(totalCount));
    },
    toggle: (isFetching) => {
      dispatch(toggleIsFetchingAC(isFetching));
    },
    disabled: (isDisabled) => {
      dispatch(disabledBtnAC(isDisabled));
    },
    thunka: (currentPage, pageSize) => {
      dispatch(gerUserThunkCreator(currentPage, pageSize));
    },
    thunkForSubscribe: (u, deleteOrPost, method) => {
      dispatch(followOrUnfollow(u, deleteOrPost, method));
    },
  };

  let staticData = {
    pageSize: state.pageSize,
    totalUserCount: state.totalUserCount,
    currentPage: state.currentPage,
    isFetching: state.isFetching,
    isDisabled: state.isDisabled,
    followingInProgress: state.followingInProgress,
    isAuth: stateAuth.isAuth,
  };
  // Navigate
  console.log("render userContainer");
  // Navigate
  return (
    // ретерном возвращаю второй контейнер, в который по пропсам передаю методы и данные нужные только для функциональной компоненты
    <UserApiComponent
      // методы в объекте
      methods={methodsForUser}
      //ниже стат данные
      users={state.users}
      static={staticData}
      currentPage={staticData.currentPage}
      pageSize={staticData.pageSize}
      getUsersThunk={methodsForUser.thunka}
      followOrUnfollow={methodsForUser.thunkForSubscribe}
    />
  );
};

class UserApiComponent extends React.Component {
  // сайд эфффект делается только в компонентДидМаунт, аякс запрос на сервак.
  componentDidMount() {
    this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
  }
  onPageChanged = (p) => {
    this.props.methods.setPageNumber(p);
    this.props.getUsersThunk(p, this.props.pageSize);
  };
  lookThis() {
    console.log("this:", this);
  }
  render() {
    // классовая компонента обязательно рисует с помощью render(), взаимствуя у родителя React.Component и уже в свою очередь отрисовывает чистую функциональную компоненту с передачей нужных пропсов
    return (
      <>
        {this.props.static.isFetching ? <Loader /> : null}
        <UsersFunctionalComponent
          unFollow={this.props.methods.unFollow}
          follow={this.props.methods.follow}
          disabled={this.props.methods.disabled}
          users={this.props.users}
          currentPage={this.props.static.currentPage}
          totalUC={this.props.static.totalUserCount}
          pageSize={this.props.static.pageSize}
          isDisabled={this.props.static.isDisabled}
          isAuth={this.props.static.isAuth}
          followingInProgress={this.props.static.followingInProgress}
          onPC={this.onPageChanged}
          followOrUnfollow={this.props.followOrUnfollow}
        />
      </>
    );
  }
}

export default UsersContainer;
