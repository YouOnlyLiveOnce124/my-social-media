import { NavLink } from "react-router-dom";
import m from "./NavBar.module.css";
import DialogsWithBestFriends from "./dialogsWithBestFriends/NavDialogsWithBestFriends";
import NavDialogsWithBestFriends from "./dialogsWithBestFriends/NavDialogsWithBestFriends";

const navActive = ({ isActive }) => (isActive ? m.active : m.nav_div);

const NavBar = () => {
  return (
    <nav className={m.nav}>
      <div className={m.menu}>
        <div className={m.selection}>
          <div className={m.nav_div}>
            <NavLink to={"/profile"} className={navActive}>
              Profile
            </NavLink>
          </div>
          <div className={m.nav_div}>
            <NavLink to={"/dialogs"} className={navActive}>
              Messages
            </NavLink>
          </div>
          <div className={m.nav_div}>
            <NavLink to={"/users"} className={navActive}>
              Users
            </NavLink>
          </div>
          <div className={m.nav_div}>
            <NavLink to={"/boat"} className={navActive}>
              Boat
            </NavLink>
          </div>
          <div className={m.nav_div}>
            <NavLink to={"/game-2048"} className={navActive}>
              2048
            </NavLink>
          </div>
          <div className={m.nav_div}>
            <a href="#">Settings</a>
          </div>
        </div>

        <div className={m.div_best_friend}>
          <NavDialogsWithBestFriends />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
