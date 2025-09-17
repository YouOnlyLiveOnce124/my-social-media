import React, { memo } from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { useSelector, useDispatch } from "react-redux";
import Posting from "./Profile/Posting";
import { addPost } from "../../../reducer/ProfilePageReducer";

const MyPosts = memo(() => {
  const posts = useSelector((state) => state.profilePage.posts);
  const dispatch = useDispatch();

  const handleAddPost = (postText) => {
    dispatch(addPost(postText));
  };

  return (
    <div className={s.content}>
      <Posting addPost={handleAddPost} />
      {posts.map((p) => (
        <Post message={p.message} likes={p.likes} id={p.id} key={p.id} />
      ))}
    </div>
  );
});

export default MyPosts;
