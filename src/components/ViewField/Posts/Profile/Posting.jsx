import React from "react";
import s from "./Posting.module.css";

import PostingReduxField from "./PostingField";

const Posting = (props) => {
  const onSubmit = (values) => {
    console.log(values.posting);
    props.addPost(values.posting);
    values.posting = "";
  };
  return (
    <div>
      <div className={s.field_div}>
        <h3>My posts</h3>

        <PostingReduxField onSubmit={onSubmit} getSybl={props.getSybl} />
      </div>
    </div>
  );
};

export default Posting;
