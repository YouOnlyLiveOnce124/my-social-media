//Reducer for theme dark-light

const initialState = {
  theme: "light",
  ddd: "zzz",
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
};

export const toggleTheme = () => ({ type: "TOGGLE_THEME" });
export const setTheme = (theme) => ({ type: "SET_THEME", theme });
