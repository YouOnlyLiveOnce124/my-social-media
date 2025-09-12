import axios from "axios";
import m from "./Users.module.css";

import xui from "../../assets/imgs/user-avatar-icon-doodle-style-png.webp";

const Users = (props) => {
  const showMe = () => {
    if (props.users.length === 0) {
      axios
        .get("https://social-network.samuraijs.com/api/1.0/users")
        .then((response) => {
          props.show(response.data.items);
        });
    }
  };

  return (
    <div>
      <button onClick={showMe}>Show list</button>
      {props.users.map((u) => (
        <div key={u.id}>
          <div id="imgSector">
            <img
              src={u.photos.small != null ? u.photos.small : xui}
              alt="ava"
              className={m.avatar}
            />
          </div>
          <div id="buttonSector">
            {u.isFollowing ? (
              <button onClick={() => props.unFollow(u.id)}>Follow</button>
            ) : (
              <button onClick={() => props.follow(u.id)}>UnFollow</button>
            )}
          </div>
          <div id="internalSector">
            <div id="fn">{u.name}</div>
            <div id="st">{u.status}</div>
            <div id="lc">
              <div>{"u.location.country"}</div>
              <div>{"u.location.city"}</div>
            </div>
          </div>
        </div>
      ))}

      <div>
        <button>Show more</button>
      </div>
    </div>
  );
};

export default Users;
