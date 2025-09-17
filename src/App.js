import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import HeaderContainerComponent from "./components/Header/HeaderContainer";
import { LoginField } from "./components/Login/Login";
import React, { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkInitialized } from "./reducer/AppReducer";
import Boat from "./components/Boat";
import ProfileContainer from "./components/ViewField/ProfileContainer";
import { WithSuspense } from "./hoc/WithSuspense";
import { setTheme } from "./reducer/themeReducer";
import Game2048 from "./components/Game2048/Game2048";

const App = () => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const DialogsWithSuspense = WithSuspense(
    lazy(() => import("./components/Dialogs/DialogsContainer"))
  );

  const UsersContainerWithSuspense = WithSuspense(
    lazy(() => import("./components/Users/UsersContainer"))
  );

  useEffect(() => {
    dispatch(thunkInitialized());

    // Обработчики глобальных ошибок
    const handleUnhandledRejection = (event) => {
      console.error("Unhandled Rejection:", event.reason);

      // sendErrorToServer(event.reason);

      // Предотвращаем вывод ошибки в консоль браузера
      event.preventDefault();
    };

    const handleError = (event) => {
      console.error("Global Error:", event.error);
      // sendErrorToServer(event.error);
      event.preventDefault();
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleError);

    // Восстанавливаем тему из localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }

    // Очистка обработчиков при размонтировании
    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
      window.removeEventListener("error", handleError);
    };
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div data-theme={theme}>
      <div className="app-wrapper">
        <HeaderContainerComponent />
        <NavBar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/profile" replace />} />
            <Route path="/profile/:userId?" element={<ProfileContainer />} />
            <Route path="/dialogs/*" element={<DialogsWithSuspense />} />
            <Route path="/users/*" element={<UsersContainerWithSuspense />} />
            <Route path="/login/" element={<LoginField />} />
            <Route path="/boat/" element={<Boat />} />
            <Route path="/game-2048/" element={<Game2048 />} />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
