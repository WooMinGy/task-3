import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../shared/firebase";
import firebase from "firebase/compat/app";

// actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER"; //어짜피 로그인을 하던 회원가입을 하던 리덕스에 유저 정보가 들어가야 하니까 하나로 합쳐줬다.

// action creators

const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: null,
  is_login: false,
};

const user_initial = {
  user_name: "mings",
};

// middleware actions
const loginFB = (id, pwd) => {
  return function (dispatch, getState, { history }) {
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then((res) => {
      auth
        .signInWithEmailAndPassword(id, pwd)
        .then((user) => {
          console.log(user);
          dispatch(
            setUser({
              user_name: user.user.displayName,
              id: id,
              user_profile: "",
              uid: user.user.uid,
            })
          );

          history.push("/");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;

          console.log(errorCode, errorMessage);
        });
    });
  };
};

const signupFB = (id, pwd, user_name) => {
  // 비밀번호 기반 계정 만들기, Firebase 문서에도 있음
  return function (dispatch, getState, { history }) {
    auth
      .createUserWithEmailAndPassword(id, pwd)
      .then((user) => {
        console.log(user);

        auth.currentUser
          .updateProfile({
            displayName: user_name,
          })
          .then(() => {
            dispatch(
              setUser({
                user_name: user_name,
                id: id,
                user_profile: "",
                uid: user.user.uid,
              })
            );
            history.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
        // signed in
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(errorCode, errorMessage); // 에러날때 메세지
        //..
      });
  };
};

const loginCheckFB = () => {
  return function (dispatch, getState, { history }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            user_name: user.displayName, //문제있음 확인해보기 user.user.displayName,으로
            user_profile: "",
            id: user.email,
            uid: user.uid,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  };
};

const logoutFB = () => {
  return function (dispatch, getState, { history }) {
    auth.signOut().then(() => {
      dispatch(logOut());
      history.replace("/");
    });
  };
};

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        setCookie("is_login", "success"); // 뒤에는 토큰이 들어갈 자리!
        draft.user = action.payload.user; // draft를 쓰면 알아서 불변성을 관리해 준다. 이때 createAction 패키지를 쓰면 중간에 payload(우리의 데이터가 담기는 곳)를 거쳐야 함
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("is_login");
        draft.user = null;
        draft.is_login = false;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
); // initialState 넣는것을 까먹으면 안된다~

// action creator export
const actionCreators = {
  logOut,
  getUser,
  signupFB,
  loginFB,
  loginCheckFB,
  logoutFB,
};

export { actionCreators };

// redux-actions 패키지를 쓸 때
// const logIn = createAction(LOG_IN, (user) => ({user}));

// const reducer = handleActions({
//   [LOG_IN]: (state, action) => {

//   },
// }, {}); 마지막 중괄호는 initialState가 들어가는 자리이다.

// redux-actions 패키지를 쓰기 전
// 액션생성함수
// const logIn= (user) =>{
//   return {
//     type: LOG_IN,
//     user
//   }
// }
// 리듀서 부분
// const reducer = () => {
//   switch(action.type){
//     case "LOG_IN" : {
//       state.user = action.user;
//     }
//   }
// }
