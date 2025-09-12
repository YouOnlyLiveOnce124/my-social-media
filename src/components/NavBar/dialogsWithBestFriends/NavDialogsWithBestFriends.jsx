import { NavLink } from "react-router-dom";
import m from "./NavDialogsWithBestFriends.module.css";

const navActive = ({ isActive }) => (isActive ? m.active : "");

const NavDialogsWithBestFriends = () => {
  return (
    <div className={m.section_dialog_with_best_friend}>
      <h3 className={m.title}>Best Friends</h3>

      <div className={m.best_friends_list}>
        <div className={m.nav_div}>
          <NavLink to={"/dialogs/1%7D"} className={navActive}>
            Billy
          </NavLink>
        </div>
        <div className={m.nav_div}>
          <NavLink to={"/dialogs/2%7D"} className={navActive}>
            Michael
          </NavLink>
        </div>
        <div className={m.nav_div}>
          <NavLink to={"/dialogs/3%7D"} className={navActive}>
            Andrew
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavDialogsWithBestFriends;
