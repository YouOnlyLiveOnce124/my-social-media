import React from "react";

import { addPost, getSybol } from "../../../../reducer/ProfilePageReducer";
import Posting from "./Posting";

import { useDispatch } from "react-redux";

const PostingContainer = () => {
  let dispatch = useDispatch();

  const add = (posting) => {
    dispatch(addPost(posting));
  };

  const get = (text) => {
    dispatch(getSybol(text));
  };

  return <Posting addPost={add} getSybl={get} />;
};

// const PostingContainer = connect(mapStateToProps, mapDispatchToProps)(Posting);

export default PostingContainer;
