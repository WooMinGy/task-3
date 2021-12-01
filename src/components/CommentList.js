import React from "react";
import { Grid, Input, Text, Image } from "../elements";

const CommentList = () => {
  return (
    <React.Fragment>
      <Grid padding="16px">
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </Grid>
    </React.Fragment>
  );
};

export default CommentList;

const CommentItem = (props) => {
  const { user_profile, user_name, user_id, post_id, contents, insert_dt } =
    props;

  return (
    <Grid is_flex>
      <Grid is_flex width="auto">
        <Image shape="circle" />
        <Text bold>{user_name}</Text>
      </Grid>
      <Grid is_flex margin="0px 6px">
        <Text margin="0px">{contents}</Text>
        <Text margin="0px">{insert_dt}</Text>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  user_profile: "",
  user_name: "mings",
  user_id: "",
  post_id: 1,
  contents: "귀여운 고양이네용",
  insert_dt: "2021-01-01 19:00:00",
};
// 이 컴포넌트를 쓰는 CommentList에서 이미 export를 하고 있기 때문에 따로 export 해줄 필요는 없다.
