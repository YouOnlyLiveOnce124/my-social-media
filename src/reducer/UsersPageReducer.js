import { getPagesFromAxios, subscription } from "../api/api";

const follow = "FOLLOW";
const unFollow = "UNFOLLOW";
const showMore = "SHOW-MORE";
const setCurrentPage = "CURRENT-PAGE";
const totalUserCountFromServer = "TOTAL-USER-COUNT";
const toggleIsFetching = "TOGGLE-IS-FETCHING";
const disabledBtn = "DISABLED-BTN";

let initialState = {
  users: [],
  pageSize: 5,
  totalUserCount: 0,
  currentPage: 1,
  isFetching: false,
  isDisabled: false,
  followingInProgress: [],
};

let usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case follow:
    case unFollow:
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return {
              ...u,
              isFollowing: action.type === follow, // true для follow, false для unFollow
            };
          }
          return u;
        }),
      };
    case showMore:
      return {
        ...state,
        users: action.users,
      };
    case setCurrentPage:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case totalUserCountFromServer:
      return {
        ...state,
        totalUserCount: action.count,
      };
    case toggleIsFetching:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case disabledBtn:
      return {
        ...state,
        followingInProgress: action.isDisabled
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id != action.userId),
      };
    default:
      return state;
  }
};

export const followAC = (userId) => ({ type: follow, userId });

export const unFollowAC = (userId) => ({ type: unFollow, userId });

export const showUsers = (users) => ({ type: showMore, users });

export const setCurPage = (currentPage) => ({
  type: setCurrentPage,
  currentPage,
});

export const getUserCountAC = (totalUserCount) => ({
  type: totalUserCountFromServer,
  count: totalUserCount,
});

export const toggleIsFetchingAC = (isFetching) => ({
  type: toggleIsFetching,
  isFetching,
});

export const disabledBtnAC = (isDisabled, userId) => ({
  type: disabledBtn,
  isDisabled,
  userId,
});

export const gerUserThunkCreator = (currentPage, pageSize) => {
  return (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    getPagesFromAxios(currentPage, pageSize).then((data) => {
      dispatch(toggleIsFetchingAC(false));
      dispatch(showUsers(data.items));
      dispatch(getUserCountAC(data.totalCount));
    });
  };
};

export const followOrUnfollow = (userId, deleteOrPost, method) => {
  return (dispatch) => {
    dispatch(disabledBtnAC(true, userId));
    subscription(userId, deleteOrPost, method).then((response) => {
      if (response.data.resultCode == 0) {
        method(userId);
      }
      dispatch(disabledBtnAC(false, userId));
    });
  };
};

export default usersReducer;
