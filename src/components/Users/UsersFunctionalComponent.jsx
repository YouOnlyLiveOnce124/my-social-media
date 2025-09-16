import React from "react";
import m from "./Users.module.css";
import userCardStyles from "./UserCard.module.css";
import xex from "../../assets/imgs/user-avatar-icon-doodle-style-png.webp";
import { NavLink } from "react-router-dom";

const UsersFunctionalComponent = (props) => {
  let pagesCount = Math.ceil(props.totalUC / props.pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let slicedPages = [];
  let curPage = props.currentPage;
  if (curPage - 3 < 0) {
    slicedPages = pages.slice(0, 5);
  } else {
    slicedPages = pages.slice(curPage - 3, curPage + 2);
  }

  return (
    <div className={m.usersContainer}>
      {/* Пагинация */}
      <div className={m.pagination}>
        {slicedPages.map((p) => (
          <span
            key={p}
            onClick={() => props.onPC(p)}
            className={`${m.pageNumber} ${
              props.currentPage === p ? m.active : ""
            }`}
          >
            {p}
          </span>
        ))}
      </div>

      {/* Список пользователей */}
      <div className={m.usersList}>
        {props.users.map((u) => (
          <div key={u.id} className={userCardStyles.userCard}>
            {/* Аватар */}
            <div className={userCardStyles.avatarSection}>
              <NavLink to={"/profile/" + u.id}>
                <img
                  src={u?.photos?.small || xex}
                  alt="avatar"
                  className={userCardStyles.avatar}
                />
              </NavLink>
            </div>

            {/* Информация */}
            <div className={userCardStyles.infoSection}>
              <h3 className={userCardStyles.userName}>
                {u?.name || "No name"}
              </h3>
              <div className={userCardStyles.location}>
                <div>{u?.location?.country || "Unknown country"}</div>
                <div>{u?.location?.city || "Unknown city"}</div>
              </div>
            </div>

            {/* Кнопка Follow/Unfollow */}
            <div className={userCardStyles.buttonSection}>
              {u.isFollowing ? (
                <button
                  className={`${userCardStyles.followBtn} ${userCardStyles.unfollow}`}
                  disabled={
                    !props.isAuth || props.followingInProgress.includes(u.id)
                  }
                  onClick={() =>
                    props.followOrUnfollow(u.id, "delete", props.unFollow)
                  }
                >
                  {props.followingInProgress.includes(u.id)
                    ? "..."
                    : "UnFollow"}
                </button>
              ) : (
                <button
                  className={`${userCardStyles.followBtn} ${userCardStyles.follow}`}
                  disabled={
                    !props.isAuth || props.followingInProgress.includes(u.id)
                  }
                  onClick={() =>
                    props.followOrUnfollow(u.id, "post", props.follow)
                  }
                >
                  {props.followingInProgress.includes(u.id) ? "..." : "Follow"}
                </button>
              )}
            </div>

            {/* Статус */}
            {u.status && (
              <p className={userCardStyles.userStatus}>{u.status}</p>
            )}
          </div>
        ))}
      </div>

      {/* Кнопка показать еще */}
      <button className={m.showMoreBtn}>Show more</button>
    </div>
  );
};

export default UsersFunctionalComponent;
