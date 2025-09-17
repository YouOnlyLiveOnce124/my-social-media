import { applyMiddleware, combineReducers, createStore } from "redux";
import profileReducer from "./ProfilePageReducer";
import messageReducer from "./MessagePageReducer";
import usersReducer from "./UsersPageReducer";
import authReducer from "./AuthReducer";
import { thunk } from "redux-thunk";
import appReducer from "./AppReducer";
import { themeReducer } from "./themeReducer";
import gameReducer from "./GameReducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: messageReducer,
  userPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  theme: themeReducer,
  game2048: gameReducer,
  // УДАЛЕНО: form: formReducer,
});

let mainStore = createStore(reducers, applyMiddleware(thunk));
window.store = mainStore;
export default mainStore;
