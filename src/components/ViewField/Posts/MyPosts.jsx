import React, { memo, useMemo } from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { useSelector } from "react-redux";
import PostingContainer from "./Profile/PostingContainer";

const MyPosts = memo(() => {
  // 1. Обернуть в memo!

  // 2. Конкретный селектор вместо объекта
  const posts = useSelector((state) => state.profilePage.posts);

  // 3. Мемоизировать маппинг постов
  const processedArrPostData = useMemo(() => {
    return posts.map((p) => (
      <Post message={p.message} likes={p.likes} id={p.id} key={p.id} />
    ));
  }, [posts]); // Пересчитывать только когда меняются posts

  return (
    <div className={s.content}>
      <PostingContainer />
      {processedArrPostData}
    </div>
  );
});

export default MyPosts;
