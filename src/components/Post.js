import React from "react";
import { Button, Grid, Image, Text } from "../elements"; // 한번에 여러개 import하는 방법 - ./elements/index.js 참고하기

import { history } from "../redux/configureStore";

const Post = (props) => {
  return (
    <React.Fragment>
      <Grid>
        <Grid is_flex>
          <Grid is_flex width="62%">
            <Image shape="circle" src={props.src} />
            <Text bold>{props.user_info.user_name}</Text>
          </Grid>
          <Text width="30%">{props.insert_dt}</Text>
          {props.is_me && (
            <Button
              width="8%"
              margin="4px"
              padding="4px"
              _onClick={() => {
                history.push(`/write/${props.id}`);
              }}
            >
              수정
            </Button>
          )}
        </Grid>
        <Grid padding="16px">
          <Text>{props.contents}</Text>
        </Grid>
        <Grid>
          <Image shape="rectangle" src={props.image_url} />
        </Grid>
        <Grid padding="16px">
          <Text margin="0px" bold>
            댓글 {props.comment_ctn}개
          </Text>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Post.defaultProps = {
  user_info: {
    user_name: "mings",
    user_profile:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F4I5WI%2FbtrmwRawr5e%2FupbtbZr3K2KRI00Wisxt11%2Fimg.png",
  },
  image_url:
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F4I5WI%2FbtrmwRawr5e%2FupbtbZr3K2KRI00Wisxt11%2Fimg.png",
  contents: "쿵이네용",
  comment_ctn: 10,
  insert_dt: "2021-02-27 10:00:00",
  is_me: false,
}; // 필요한 props들을 미리 넘겨놓는 방식 - props가 없어서 오류가 난다던가 화면이 깨지는것을 방지할 수 있음 하지만 props를 잘못 가져왔을때의 방어는 힘들다.

export default Post;
