import React from "react";
import { Post, CommentList, CommentWrite } from "../components";

import Permit from "../shared/Permit";

import { useDispatch, useSelector } from "react-redux";

import { actionCreators as postActions } from "../redux/modules/post";

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  // console.log(id);
  const user_info = useSelector((state) => state.user.user);

  const post_list = useSelector((store) => store.post.list);

  const post_idx = post_list.findIndex((p) => p.id === id);
  const post = post_list[post_idx];
  // console.log(post);

  React.useEffect(() => {
    //댓글기능
    if (post) {
      return;
    }

    dispatch(postActions.getOnePostFB(id));
  }, []);

  return (
    <React.Fragment>
      {post && (
        <Post {...post} is_me={post.user_info.user_id === user_info?.uid} />
      )}
      <Permit>
        <CommentWrite post_id={id} />
      </Permit>
      <CommentList post_id={id} />
    </React.Fragment>
  );
};

export default PostDetail;
