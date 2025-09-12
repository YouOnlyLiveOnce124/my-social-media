import { thunkCreatorLogin } from "./AuthReducer";

const set_app = "SET-APP";

let initialState = {
  isInitialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case set_app:
      return {
        ...state,
        isInitialized: true,
      };

    default:
      return state;
  }
};

const initialized = () => ({ type: set_app });

export const thunkInitialized = () => {
  return (dispatch, getState) => {
    // Защита от повторной инициализации
    if (getState().app.isInitialized) return;

    const promise = dispatch(thunkCreatorLogin());

    Promise.all([promise])
      .then(() => {
        dispatch(initialized());
      })
      .catch(() => {
        // Даже если логин неудачный, помечаем как инициализированное
        dispatch(initialized());
      });
  };
};

export default appReducer;
