import { NavLink, useNavigate } from "react-router-dom";
import m from "./Header.module.css";
import React from "react";

import AnimatedLogo from "../GeneralItems/AnimatedLogo";
import ThemeToggle from "../GeneralItems/ThemeToggle";

const Header = (props) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (props.state.isAuth) {
      navigate("/profile");
    } else {
      navigate("/");
    }
  };

  // Новая функция для клика по тексту - ничего не делает
  const handleTextClick = (e) => {
    e.stopPropagation(); // Останавливаем всплытие события
    // Можно добавить другую логику если нужно
  };

  return (
    <header className={m.header}>
      <div className={m.logoSection}>
        {/* Иконка с обработчиком клика */}
        <img
          src="https://img.icons8.com/fluent/512w/gachi.png"
          alt="logo"
          className={m.logo}
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }}
        />

        {/* Текст без перехода на профиль */}
        <div onClick={handleTextClick} style={{ cursor: "default" }}>
          <AnimatedLogo />
        </div>
      </div>

      <div className={m.controls}>
        <ThemeToggle />

        <div className={m.login}>
          {props.state.isAuth ? (
            <span className={m.stateLogin}>{props.state.login}</span>
          ) : (
            <NavLink to={"/login"}>Login</NavLink>
          )}
          <div>
            {props.state.isAuth && (
              <button onClick={props.logOut} className={m.logoutBtn}>
                Exit
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
