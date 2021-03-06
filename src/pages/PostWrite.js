import React from "react";
import { Grid, Text, Button, Image, Input } from "../elements";
import Upload from "../shared/Upload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as imageActions } from "../redux/modules/image";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const preview = useSelector((state) => state.image.preview);
  const post_list = useSelector((state) => state.post.list);

  // console.log(props.match.params.id); // id를 콘솔로 찍어보자 수정페이지에서

  const post_id = props.match.params.id;
  const is_edit = post_id ? true : false;

  const { history } = props;

  let _post = is_edit ? post_list.find((p) => p.id === post_id) : null;

  // console.log(_post);
  const [contents, setContents] = React.useState(_post ? _post.contents : "");

  React.useEffect(() => {
    // 수정페이지에서 새로고침(리랜더링)해서 값이 없을때 할 행동들
    if (is_edit && !_post) {
      window.alert("포스트 정보가 없어요!");
      // console.log("포스트 정보가 없어요!");
      history.goBack();

      return;
    }

    if (is_edit) {
      // 수정페이지 일때 이미지 가져오기
      dispatch(imageActions.setPreview(_post.image_url));
    }
  }, []);

  const changeContents = (e) => {
    //게시글 작성 - 바뀌는 텍스트 값 바로 오게하기
    setContents(e.target.value);
  };

  const addPost = () => {
    // 게시글 작성 onClick 함수
    dispatch(postActions.addPostFB(contents));
  };

  const editPost = () => {
    dispatch(postActions.editPostFB(post_id, { contents: contents }));
  };

  if (!is_login) {
    return (
      <Grid margin="100px 0px" padding="16px" center>
        <Text size="32px" bold>
          어이구...잠깐만요!
        </Text>
        <Text size="16px">로그인 후에만 글을 작성할 수 있어요!</Text>
        <Button
          _onClick={() => {
            history.replace("/login");
          }}
        >
          로그인 하러가기
        </Button>
      </Grid>
    );
  }
  return (
    <React.Fragment>
      <Grid padding="16px">
        <Text size="36px" bold>
          {is_edit ? "게시글 수정" : "게시글 작성"}
        </Text>
        <Upload />
      </Grid>

      <Grid>
        <Grid padding="16px">
          <Text margin="0px" size="24px">
            미리보기
          </Text>
        </Grid>

        <Image
          shape="rectangle"
          src={
            preview
              ? preview
              : "https://blog.kakaocdn.net/dn/yNtgW/btrmKkQHuOa/OleSub2Kfz7nKcaA54M3Jk/img.gif"
          }
        ></Image>
      </Grid>

      <Grid padding="16px">
        <Input
          value={contents}
          _onChange={changeContents}
          label="게시글 내용"
          placeholder="게시글 작성"
          multiLine
        />
      </Grid>

      <Grid padding="16px">
        {is_edit ? (
          <Button text="게시글 수정" _onClick={editPost}></Button>
        ) : (
          <Button text="게시글 작성" _onClick={addPost}></Button>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default PostWrite;
