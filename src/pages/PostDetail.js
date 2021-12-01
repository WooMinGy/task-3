import React from "react";
import { Post, CommentList, CommentWrite } from "../components";

const PostDetail = () => {
  return (
    <React.Fragment>
      <Post />
      <CommentWrite />
      <CommentList />
    </React.Fragment>
  );
};

export default PostDetail;
