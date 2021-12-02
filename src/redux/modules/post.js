import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { firestore, storage } from "../../shared/firebase";
import "moment";
import moment from "moment";

import { actionCreators as imageActions } from "./image";

const SET_POST = "SET_POST";
const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";
const LOADING = "LOADING";

const setPost = createAction(SET_POST, (post_list, paging) => ({
  post_list,
  paging,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: [],
  paging: { start: null, next: null, size: 3 },
  is_loading: false,
};

const initialPost = {
  // id: 0,
  // user_info: {
  //   user_name: "mings",
  //   user_profile:
  //     "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F4I5WI%2FbtrmwRawr5e%2FupbtbZr3K2KRI00Wisxt11%2Fimg.png",
  // },
  image_url:
    "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F4I5WI%2FbtrmwRawr5e%2FupbtbZr3K2KRI00Wisxt11%2Fimg.png",
  contents: "",
  comment_ctn: 0,
  insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"),
  // 여기서 moment를 쓴다 현재의 날짜, 시간을 가져와준다.
};

const editPostFB = (post_id = null, post = {}) => {
  return function (dispatch, getState, { history }) {
    if (!post_id) {
      console.log("게시물 정보가 없어요!");
      return;
    }
    const _image = getState().image.preview;

    const _post_idx = getState().post.list.findIndex((p) => p.id === post_id);
    const _post = getState().post.list[_post_idx];
    // console.log(_post);

    const postDB = firestore.collection("post");

    if (_image === _post.image_url) {
      postDB
        .doc(post_id)
        .update(post)
        .then((doc) => {
          dispatch(editPost(post_id, { ...post }));
          history.replace("/");
        });
      return;
    } else {
      const user_id = getState().user.user.uid;
      const _upload = storage
        .ref(`images/${user_id}_${new Date().getTime()}`)
        .putString(_image, "data_url");

      _upload.then((snapshot) => {
        snapshot.ref
          .getDownloadURL()
          .then((url) => {
            return url;
          })
          .then((url) => {
            postDB
              .doc(post_id)
              .update({ ...post, image_url: url })
              .then((doc) => {
                dispatch(editPost(post_id, { ...post, image_url: url }));
                history.replace("/");
              });
          })
          .catch((err) => {
            window.alert("에고... 이미지 업로드에 문제가 있어요!");
            console.log("에고... 이미지 업로드에 문제가 있어요!", err);
          });
      });
    }
  };
};

const addPostFB = (contents = "") => {
  return function (dispatch, getState, { history }) {
    const postDB = firestore.collection("post");

    const _user = getState().user.user;
    // console.log(_user);

    const user_info = {
      user_name: _user.user_name,
      user_id: _user.uid,
      user_profile: _user.user_profile,
    };

    const _post = {
      ...initialPost,
      contents: contents,
      insert_dt: moment().format("YYYY-MM-DD hh:mm:ss"), // 여기에 또 하는 이유는 ADD_POST가 일어날때의 시간이 필요해서 이다.
    };
    // console.log({ ...user_info, ..._post });

    const _image = getState().image.preview;
    // console.log(_image);
    // console.log(typeof _image); 스트링
    const _upload = storage
      .ref(`images/${user_info.user_id}_${new Date().getTime()}`)
      .putString(_image, "data_url");
    // 파일명을 고유화 시키기 위해 uid와 업로드 시간을 가져와 엮어주었다.

    _upload.then((snapshot) => {
      snapshot.ref
        .getDownloadURL()
        .then((url) => {
          console.log(url); // url 잘 들어오는지 확인

          return url;
        })
        .then((url) => {
          postDB
            .add({ ...user_info, ..._post, image_url: url })
            .then((doc) => {
              let post = {
                user_info: user_info,
                ..._post,
                id: doc.id,
                image_url: url,
              };
              dispatch(addPost(post));
              history.replace("/");

              dispatch(imageActions.setPreview(null));
            })
            .catch((err) => {
              window.alert("에고... 포스트 작성에 문제가 있어요!");
              console.log("post 작성에 실패했어요!", err);
            });
          // ~~~.add({추가할정보})
        })
        .catch((err) => {
          window.alert("에고... 이미지 업로드에 문제가 있어요!");
          console.log("에고... 이미지 업로드에 문제가 있어요!", err);
        });
    });
  };
};

const getPostFB = (start = null, size = 3) => {
  return function (dispatch, getState, { history }) {
    let _paging = getState().post.paging;

    if (_paging.start && !_paging.next) {
      return;
    }

    dispatch(loading(true));
    const postDB = firestore.collection("post");

    let query = postDB.orderBy("insert_dt", "desc");
    // 지정해둔 사이즈보다 +1을 해주는 이유는 리덕스에 사이즈 3만큼 저장해서 보여줄때 파이어베이스에서 미리 데이터를 가져오기 위해서이다.

    if (start) {
      query = query.startAt(start);
    }

    query
      .limit(size + 1)
      .get()
      .then((docs) => {
        let post_list = [];

        let paging = {
          start: docs.docs[0],
          next:
            docs.docs.length === size + 1
              ? docs.docs[docs.docs.length - 1]
              : null, // 네번째꺼 보여줘!
          size: size,
        };

        docs.forEach((doc) => {
          let _post = doc.data();

          // ['comment_cnt', 'contents', ...] 이렇게 배열로 만들어준다.
          let post = Object.keys(_post).reduce(
            (acc, cur) => {
              if (cur.indexOf("user_") !== -1) {
                return {
                  ...acc,
                  user_info: { ...acc.user_info, [cur]: _post[cur] },
                };
              }
              return { ...acc, [cur]: _post[cur] };
            },
            { id: doc.id, user_info: {} }
          );
          post_list.push(post);
        });

        post_list.pop(); //마지막 친구 없애주기

        dispatch(setPost(post_list, paging));
      });
  };
};

// postDB.get().then((docs) => {
//   let post_list = [];
//   docs.forEach((doc) => {
//     let _post = doc.data();

//     // ['comment_cnt', 'contents', ...] 이렇게 배열로 만들어준다.
//     let post = Object.keys(_post).reduce(
//       (acc, cur) => {
//         if (cur.indexOf("user_") !== -1) {
//           return {
//             ...acc,
//             user_info: { ...acc.user_info, [cur]: _post[cur] },
//           };
//         }
//         return { ...acc, [cur]: _post[cur] };
//       },
//       { id: doc.id, user_info: {} }
//     );
//     post_list.push(post);

//     // let _post = {         파이어배이스와 리덕스에서의 값들이 똑같이 묶여있지 않은경우 일치시켜주는 과정
//     //   id: doc.id,         이렇게도 쓸 수 있다.
//     //   ...doc.data(),
//     // };

//     // let post = {
//     //   id: doc.id,
//     //   user_info: {
//     //     user_name: _post.user_name,
//     //     user_profile: _post.user_profile,
//     //     user_id: _post.user_id,
//     //   },
//     //   image_url: _post.image_url,
//     //   contents: _post.contents,
//     //   comment_ctn: _post.comment_ctn,
//     //   insert_dt: _post.insert_dt,
//     // };

//     // post_list.push(post);
//   });

//   console.log(post_list);

//   dispatch(setPost(post_list));
// });

export default handleActions(
  {
    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        draft.paging = action.payload.paging;
        draft.is_loading = false;
      }),

    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post); // 맨 앞으로 넣기 위해 unshift
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

        draft.list[idx] = { ...draft.list[idx], ...action.payload.post }; // 수정할 때 이미지는 놔두고 게시글만 수정핧 수도 있기때문에 스프레드 문법 사용
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

const actionCreators = {
  setPost,
  addPost,
  editPost,
  getPostFB,
  addPostFB,
  editPostFB,
};

export { actionCreators };
