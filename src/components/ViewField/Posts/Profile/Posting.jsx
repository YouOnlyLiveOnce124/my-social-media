import React from "react";
import s from "./Posting.module.css";
import PostingField from "./PostingField";

const Posting = (props) => {
  const addPost = (postText) => {
    props.addPost(postText);
  };

  return (
    <div>
      <div className={s.field_div}>
        <h3>My posts</h3>
        <PostingField addPost={addPost} />
      </div>
    </div>
  );
};

export default Posting;
