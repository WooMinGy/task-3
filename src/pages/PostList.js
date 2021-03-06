// PostList.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid } from "../elements";
import Post from "../components/Post";
import { actionCreators as postActions } from "../redux/modules/post";
import InfinityScroll from "../shared/infinityScroll";

const PostList = (props) => {
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const is_loading = useSelector((state) => state.post.is_loading);
  const paging = useSelector((state) => state.post.paging);
  // console.log(post_list);

  const { history } = props;

  React.useEffect(() => {
    if (post_list.length < 2) {
      // 추가한 게시글이 맨 앞으로 오도록
      dispatch(postActions.getPostFB());
    }
  }, []);

  return (
    <React.Fragment>
      <Grid bg={"#EFF6FF"}>
        {/* <Post /> */}
        <InfinityScroll
          callNext={() => {
            // console.log("next!");
            // console.log("123");
            // console.log(paging.next);
            dispatch(postActions.getPostFB(paging.next));
          }}
          is_next={paging.next ? true : false}
          loading={is_loading}
        >
          {post_list.map((p, idx) => {
            if (p.user_info.user_id === user_info?.uid) {
              // 옵셔널체이닝 활용 - 앞에 조건이 맞으면 뒤에도
              return (
                <Grid
                  bg="#ffffff"
                  padding="20px 0px"
                  key={p.id}
                  _onClick={() => {
                    history.push(`/post/${p.id}`);
                  }}
                >
                  <Post {...p} is_me />
                </Grid>
              );
            } else {
              return (
                <Grid
                  bg="#ffffff"
                  key={p.id}
                  _onClick={() => {
                    history.push(`/post/${p.id}`);
                  }}
                >
                  <Post {...p} />
                </Grid>
              );
            }
          })}
        </InfinityScroll>
      </Grid>
    </React.Fragment>
  );
};

export default PostList;
