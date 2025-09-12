import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../reducer/themeReducer";
import styles from "./ThemeToggle.module.css";

const ThemeToggle = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <button
      className={styles.themeToggle}
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      {theme === "light" ? "🌙" : "☀️"}
      <span className={styles.tooltip}>
        {theme === "light" ? "Dark mode" : "Light mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
