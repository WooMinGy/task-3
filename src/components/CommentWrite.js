import React from "react";
import { Grid, Input, Button } from "../elements";

import { actionCreators as commentActions } from "../redux/modules/comment";
import { useDispatch, useSelector } from "react-redux";

const CommentWrite = (props) => {
  const dispatch = useDispatch();
  const [comment_text, setCommentText] = React.useState();

  const { post_id } = props;

  const onChange = (e) => {
    setCommentText(e.target.value);
  };

  const write = () => {
    // console.log(comment_text);  댓글 인풋에 text써서 작성 눌렀을때 잘 나오는지 확인!
    dispatch(commentActions.addCommentFB(post_id, comment_text));
    setCommentText(""); //텍스트를 날려준다
  };

  return (
    <React.Fragment>
      <Grid padding="16px" is_flex>
        <Input
          placeholder="댓글 내용을 입력하세요! :)"
          _onChange={onChange}
          value={comment_text} // value를 주는 이유는 댓글 작성을 눌렀을때 인풋에 있는 텍스트를 날려주기 위해서!
          onSubmit={write}
          is_submit
        />
        <Button width="50px" margin="0px 2px 0px 2px" _onClick={write}>
          작성
        </Button>
      </Grid>
    </React.Fragment>
  );
};

export default CommentWrite;
