import React from "react";
import Grid from "../elements/Grid";

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <div>user profile / user name / insert_dt</div>
        <div>contents</div>
        <div>image</div>
        <div>comment cnt</div>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "mings",
    user_profile:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F8xO7v%2FbtrmnmIUwwu%2F8FkzhKZfe6YF1BMtLx1wyK%2Fimg.png",
    image_url:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F8xO7v%2FbtrmnmIUwwu%2F8FkzhKZfe6YF1BMtLx1wyK%2Fimg.png",
    contents: "티모네용",
    comment_ctn: 10,
    insert_dt: "2021-02-27 10:00:00",
  },
}; // 필요한 props들을 미리 넘겨놓는 방식 - props가 없어서 오류가 난다던가 화면이 깨지는것을 방지할 수 있음 하지만 props를 잘못 가져왔을때의 방어는 힘들다.

export default Post;
