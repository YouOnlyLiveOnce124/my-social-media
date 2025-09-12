import { stopSubmit } from "redux-form";
import {
  getAxiosIdEmailLog,
  logOut,
  postFormData,
  getCaptchaUrl,
} from "../api/api";

const SET_USER = "SET-USER-DATA";
const SET_CAPTCHA_URL = "SET-CAPTCHA-URL";

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.data,
      };
    case SET_CAPTCHA_URL:
      return {
        ...state,
        captchaUrl: action.captchaUrl,
      };
    default:
      return state;
  }
};

export const setLoginAc = (id, email, login, isAuth) => ({
  type: SET_USER,
  data: { id, email, login, isAuth },
});

export const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTCHA_URL,
  captchaUrl,
});

export const thunkCreatorLogin = () => (dispatch) => {
  return getAxiosIdEmailLog().then((data) => {
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      dispatch(setLoginAc(id, email, login, true));
      dispatch(setCaptchaUrl(null)); // очищаем captcha при успешном логине
    }
  });
};

export const thunkAuthPostUser = (
  email,
  password,
  rememberMe = false,
  captcha = null
) => {
  return (dispatch) => {
    postFormData(email, password, rememberMe, captcha).then((data) => {
      if (data.resultCode === 0) {
        dispatch(thunkCreatorLogin());
      } else {
        // Если требуется captcha (код ошибки 10)
        if (data.resultCode === 10) {
          // Получаем captcha URL
          getCaptchaUrl().then((captchaData) => {
            dispatch(setCaptchaUrl(captchaData.url));

            // Показываем ошибку с требованием ввести captcha
            dispatch(
              stopSubmit("login", {
                _error: "Please enter the captcha",
              })
            );
          });
        } else {
          // Обычная ошибка
          dispatch(
            stopSubmit("login", {
              _error:
                data.messages.length > 0
                  ? data.messages[0]
                  : "Error, check your values",
            })
          );
        }
      }
    });
  };
};

export const thunkLogOut = () => {
  return (dispatch) => {
    logOut().then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setLoginAc(null, null, null, false));
        dispatch(setCaptchaUrl(null)); // очищаем captcha при выходе
      }
    });
  };
};

export const updateCaptcha = () => {
  return (dispatch) => {
    getCaptchaUrl().then((captchaData) => {
      dispatch(setCaptchaUrl(captchaData.url));
    });
  };
};
export default authReducer;
