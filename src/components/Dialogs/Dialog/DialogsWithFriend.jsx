import { NavLink } from "react-router-dom";
import m from "./DialogsWithFriend.module.css";
const teg_active = ({ isActive }) => (isActive ? m.active : "xui");
const DialogsWithFriend = (props) => {
  return (
    <div className={m.dialogs_general}>
      <img src={`${props.src}`} alt="avatar" className={m.avatar} />
      <div className={m.name_friend}>
        <NavLink to={`/dialogs/${props.path}}`} className={teg_active}>
          {props.name}
        </NavLink>
      </div>
    </div>
  );
};

export default DialogsWithFriend;
