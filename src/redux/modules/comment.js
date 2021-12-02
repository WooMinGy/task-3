import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore } from "../../shared/firebase";
import "moment";
import moment from "moment";

import firebase from "@firebase/app-compat";

import { actionCreators as postActions } from "./post";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const addCommentFB = (post_id, contents) => {
  // 좋아요 기능 추가할때 참고
  return function (dispatch, getState, { history }) {
    const commentDB = firestore.collection("comment");
    const user_info = getState().user.user;

    let comment = {
      post_id: post_id,
      user_id: user_info.uid,
      user_name: user_info.user_name,
      user_profile: user_info.user_profile,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    commentDB.add(comment).then((doc) => {
      // 댓글 추가할때 파이어배이스에도 추가
      const postDB = firestore.collection("post");

      const post = getState().post.list.find((l) => l.id === post_id); //리덕스에 있는거 가지고 온다, 리스트의 아이디와 파이어배이스의 포스트 아이디와 같니?

      const increment = firebase.firestore.FieldValue.increment(1); // increment 안에 들어있는 숫자만큼 현재 값에 플러스 해주는 친구

      comment = { ...comment, id: doc.id };
      postDB
        .doc(post_id)
        .update({ comment_cnt: increment })
        .then((_post) => {
          dispatch(addComment(post_id, comment)); // 파이어배이스 게시물 댓글수에 +1 해주기 위해 업데이트, post_id를 찾아가 cnt가 몇개인지 가져와야 한다

          if (post) {
            // 리덕스 안의 cnt 개수 추가
            dispatch(
              postActions.editPost(post_id, {
                comment_cnt: parseInt(post.comment_cnt) + 1, // 묵시적 형변환(string + number = string형태로 나오는것) 때문에 parseInt 사용
              })
            );
          }
        });
    });
  };
};

const getCommentFB = (post_id = null) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      // post_id가 없으면 애초에 접근 못하도록!
      return;
    }
    const commentDB = firestore.collection("comment");

    commentDB
      .where("post_id", "==", post_id)
      .orderBy("insert_dt", "desc")
      .get()
      .then((docs) => {
        let list = [];

        docs.forEach((doc) => {
          list.push({ ...doc.data(), id: doc.id });
        });

        dispatch(setComment(post_id, list));
      })
      .catch((err) => {
        console.log("댓글 정보를 가져올 수가 없어요.", err);
      });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        // let data = {[post_id]: com_list, ...} 이런식으로 만들어 볼것이다.
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  addCommentFB,
  setComment,
  addComment,
};

export { actionCreators };
