import {
  getAxiosIdEmailLog,
  logOut,
  postFormData,
  getCaptchaUrl,
} from "../api/api";

const SET_USER = "SET-USER-DATA";
const SET_CAPTCHA_URL = "SET-CAPTCHA-URL";

let initialState = {
  id: 0,
  email: "",
  login: "",
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
  return async (dispatch) => {
    try {
      const data = await postFormData(email, password, rememberMe, captcha);

      if (data.resultCode === 0) {
        // ✅ Успешный логин
        await dispatch(thunkCreatorLogin());
        return { success: true }; // Возвращаем успех
      } else {
        // ❌ Ошибка логина
        if (data.resultCode === 10) {
          // Captcha required
          const captchaData = await getCaptchaUrl();
          dispatch(setCaptchaUrl(captchaData.url));
          return {
            success: false,
            error: "Please enter the captcha",
            resultCode: 10,
          };
        } else {
          // Другие ошибки
          return {
            success: false,
            error: data.messages?.[0] || "Error, check your values",
            resultCode: data.resultCode,
          };
        }
      }
    } catch (error) {
      return {
        success: false,
        error: "Network error",
        resultCode: -1,
      };
    }
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
