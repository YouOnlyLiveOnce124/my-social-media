import React, { memo } from "react";
import MainInfoAboutProfile from "./MainInfoAboutProfile/MainInfoAboutProfile";
import MyPosts from "./Posts/MyPosts";
import "./ViewField.css";

const ViewField = memo((props) => {
  return (
    <div className="main_field">
      <section className="profile_section">
        <MainInfoAboutProfile
          profile={props.profile}
          status={props.status}
          updateStatus={props.updateStatus}
          paramsId={props.paramsId}
          myProfileId={props.myProfileId}
          isMyProfile={props.isMyProfile}
        />
      </section>

      <section className="posts_section">
        <MyPosts />
      </section>
    </div>
  );
});

export default ViewField;
